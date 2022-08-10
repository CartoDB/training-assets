import IconClusterLayer from 'components/layers/lib/pointclustering';
import { fetchLayerData, MAP_TYPES } from '@deck.gl/carto';
import { useSelector } from 'react-redux';
import { selectSourceById } from '@carto/react-redux';
import selectedListings from 'components/views/Listings';
import htmlForFeature from 'utils/htmlForFeature';

export const CLUSTER_LAYER_ID = 'ClusterLayer';

export default function ClusterLayer() {
  const { ClusterLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, ClusterLayer?.source));

  const fetchData = async () => {
    const result = await fetchLayerData({
      type: MAP_TYPES.QUERY,
      source: `SELECT * FROM SUPPORT.SUPPORT.AIRBNB_LISTINGS_LA`,
      connection: 'cartosf',
      format: 'geojson',
    });
    const data = await result;
    return data;
  };
  return new IconClusterLayer({
    id: CLUSTER_LAYER_ID,
    data: fetchData().then((result) => result.data.features),
    getPosition: (d) => d.geometry.coordinates,
    sizeScale: 60,
    pickable: true,
    onHover: (info) => {
      if (info?.object) {
        if (info.object.properties) {
          info.object = {
            html: htmlForFeature({ feature: { properties: info.object.properties } }),
            style: {},
          };
        }
      }
    },
  });
}
