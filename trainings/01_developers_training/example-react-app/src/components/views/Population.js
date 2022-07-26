import { useEffect } from 'react';
import h3popSource from 'data/sources/h3popSource';
import { H3_POPULATION_LAYER_ID } from 'components/layers/H3PopulationLayer';
import { useDispatch } from 'react-redux';
import { HistogramWidget } from "@carto/react-widgets";

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
    dispatch(addSource(h3popSource));

    dispatch(
      addLayer({
        id: H3_POPULATION_LAYER_ID,
        source: h3popSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(H3_POPULATION_LAYER_ID));
      dispatch(removeSource(h3popSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.population}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
