import { useSelector } from 'react-redux';
import { CartoLayer, colorContinuous } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const POPULATION_LAYER_ID = 'populationLayer';

export default function PopulationLayer() {
  const { populationLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, populationLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (populationLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: POPULATION_LAYER_ID,
      geoColumn: 'h3',
      aggregationExp: 'SUM(population) tot_pop',
      getFillColor: colorContinuous({
        attr: 'tot_pop',
        domain: [0, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10], colors: 'Sunset',}),
      pointRadiusMinPixels: 2,
      getLineColor: [255, 0, 0],
      lineWidthMinPixels: 1,
      filled: true,
      extruded: true,
      wireframe: false,
      getElevation: (f) => {
        return f.properties.tot_pop ? f.properties.tot_pop / 10 : 0;},
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
  }
}
