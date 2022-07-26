import { MAP_TYPES } from '@deck.gl/carto';

const H3POP_SOURCE_ID = 'h3popSource';

const source = {
  id: H3POP_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-academy.developers.h3_population`,
};

export default source;
