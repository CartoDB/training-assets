import { useSelector } from 'react-redux';
import { CartoLayer, colorContinuous } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const H3_POPULATION_LAYER_ID = 'h3PopulationLayer';

export default function H3PopulationLayer() {
  const { h3PopulationLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, h3PopulationLayer?.source)
  );
  const cartoLayerProps = useCartoLayerProps({ source });

  if (h3PopulationLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: H3_POPULATION_LAYER_ID,
      geoColumn: 'h3',
      aggregationExp: 'SUM(population) as total_population',
      getFillColor: colorContinuous({
        attr: 'total_population',
        domain: [0, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10],
        colors: 'Sunset',
      }),
      pointRadiusMinPixels: 2,
      getLineColor: [255, 0, 0],
      lineWidthMinPixels: 1,
      filled: true,
      extruded: true,
      wireframe: false,
      getElevation: (f) => {
        return f.properties.total_population ? f.properties.total_population / 10 : 0;
      },
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
