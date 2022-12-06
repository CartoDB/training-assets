import { useEffect } from 'react';
import populationSource from 'data/sources/populationSource';
import { POPULATION_LAYER_ID } from 'components/layers/PopulationLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  population: {},
}));

export default function Population() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(populationSource));

    dispatch(
      addLayer({
        id: POPULATION_LAYER_ID,
        source: populationSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(POPULATION_LAYER_ID));
      dispatch(removeSource(populationSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.population}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
