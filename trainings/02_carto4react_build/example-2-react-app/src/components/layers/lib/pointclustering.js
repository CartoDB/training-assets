import { CompositeLayer } from 'deck.gl'
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import Supercluster from "supercluster";
import { lineString } from "@turf/helpers";
import bbox from "@turf/bbox";
import hexRgb from 'hex-to-rgba';
import htmlForFeature from 'utils/htmlForFeature';

const getIconSize = size => {
    return Math.min(100, size) / 100 + 1;
};

const getRgbColor = hexcolor => {
    return hexRgb(hexcolor).match(/\d+/g).slice(0, 3).map(Number)
}

const getClusterColor = pointCount => {

    let color = getRgbColor('#a059a0');

    if (pointCount < 10) {
        color = getRgbColor('#a059a0');
    } else if (pointCount < 100) {
        color = getRgbColor('#ce6693');
    } else {
        color = getRgbColor('#eb7f86');
    }
    return color;
};

const getMaxMinSize = maxValue => {
    if (maxValue < 100) {
        return 15;
    } else if (100 <= maxValue && maxValue < 1000) {
        return 20;
    } else {
        return 25;
    }
};

const calculateBoundingBox = innerComponents => {
    const coordinates = innerComponents.map(
        innerComponent => innerComponent.geometry.coordinates
    );
    const line = lineString(coordinates);
    const bboxCoord = bbox(line);
    return [[bboxCoord[0], bboxCoord[1]], [bboxCoord[2], bboxCoord[3]]];
};

export default class IconClusterLayer extends CompositeLayer {
    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    updateState({ props, oldProps, changeFlags }) {
        const rebuildIndex =
            changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

        if (rebuildIndex) {
            const index = new Supercluster({ maxZoom: 16, radius: props.sizeScale });
            index.load(
                props.data.map(d => ({
                    geometry: { coordinates: props.getPosition(d) },
                    properties: d
                }))
            );
            this.setState({ index });
        }

        const z = Math.floor(this.context.viewport.zoom);
        if (rebuildIndex || z !== this.state.z) {
            this.setState({
                data: this.state.index.getClusters([-180, -85, 180, 85], z),
                z
            });
        }
    }

    getPickingInfo({ info, mode }) {
        const pickedObject = info.object && info.object.properties;
        if (pickedObject) {
            if (pickedObject.cluster && mode !== "hover") {
                info.bbox = calculateBoundingBox(
                    this.state.index.getLeaves(pickedObject.cluster_id, "infitiy", 0)
                );
            }
            info.object = pickedObject;
        }
        return info;
    }

    renderLayers() {
        const { data } = this.state;
        const {
            sizeScale,
            onClick,
            onClickCluster,
            onClickSingleIcon
        } = this.props;
        const clusterData = data.filter(obj => obj.properties.cluster);
        const nonClusterData = data.filter(obj => !obj.properties.cluster);

        const maxValueCluster = Math.max(
            ...clusterData.map(obj => obj.properties.point_count)
        );
        return [
            new ScatterplotLayer(
                this.getSubLayerProps({
                    id: "cluster-circle",
                    data: clusterData,
                    pickable: true,
                    opacity: 0.8,
                    filled: true,
                    radiusMinPixels: getMaxMinSize(maxValueCluster),
                    radiusMaxPixels: getMaxMinSize(maxValueCluster),
                    stroked: false,
                    getPosition: d => d.geometry.coordinates,
                    getRadius: d => getIconSize(d.properties.point_count) * 100,
                    getFillColor: d => getClusterColor(d.properties.point_count),
                    getLineColor: d => [0, 0, 0],
                    parameters: {
                        depthTest: false
                    },
                    onHover: (info) => {
                        if (info?.object) {
                            console.log(info.object)
                          info.object = {
                            html: htmlForFeature({ feature: info.object }),
                            style: {},
                          };
                        }
                      }
                })
            ),
            new TextLayer(
                this.getSubLayerProps({
                    id: "cluster-text",
                    data: clusterData,
                    getPosition: d => d.geometry.coordinates,
                    getText: d => d.properties.point_count + "",
                    getSize: d => 15,
                    getColor: d => [255, 255, 255],
                    sizeScale: 24 / 20,
                    getTextAnchor: "middle",
                    getAlignmentBaseline: "center"
                })
            ),
            new ScatterplotLayer(
                this.getSubLayerProps({
                    id: "points",
                    data: nonClusterData,
                    sizeScale,
                    pickable: true,
                    getRadius: 10,
                    getFillColor: getRgbColor('#5c53a5'),
                    getPosition: d => d.geometry.coordinates,
                    onHover: (info) => {
                        if (info?.object) {
                          info.object = {
                            html: htmlForFeature({ feature: info.object }),
                            style: {},
                          };
                        }
                      }
                })
            )
        ];
    }
}
