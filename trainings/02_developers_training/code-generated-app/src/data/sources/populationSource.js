import { MAP_TYPES } from '@deck.gl/carto';

const POPULATION_SOURCE_ID = 'populationSource';

const source = {
  id: POPULATION_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'bq-conn',
  data: `carto-academy.developers.h3_population`,
};

export default source;
