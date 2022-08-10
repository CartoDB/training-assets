import { MAP_TYPES } from '@deck.gl/carto';

const LISTINGS_SOURCE_ID = 'listingsSource';

const source = {
  id: LISTINGS_SOURCE_ID,
  type: MAP_TYPES.TILESET,
  connection: 'cartosf',
  data: `SUPPORT.SUPPORT.AIRBNB_LISTINGS_TILESETS`,
};

export default source;
