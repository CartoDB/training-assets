import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const LISTINGS_LAYER_ID = 'listingsLayer';

export default function ListingsLayer() {
  const { listingsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, listingsLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (listingsLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: LISTINGS_LAYER_ID,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      getLineColor: [255, 0, 0],
      lineWidthMinPixels: 1,
      pickable: true,
      visible: false,
    });
  }
}
