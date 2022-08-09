import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import listingsSource from 'data/sources/listingsSource';
import { CLUSTER_LAYER_ID } from 'components/layers/ClusterLayer';

import { LISTINGS_LAYER_ID } from 'components/layers/ListingsLayer';
import { AggregationTypes } from '@carto/react-core';
import { makeStyles } from '@material-ui/core/styles';
import { FormulaWidget, ScatterPlotWidget } from '@carto/react-widgets';
import { currencyFormatter, numberFormatter } from 'utils/formatter';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listings: {},
  title: {
    display: 'block',
    marginBottom: theme.spacing(1),
    fontSize: 15,
    padding: theme.spacing(0.01, 1),
  },
  element: {
    ...theme.typography.overline,
    textTransform: 'none',
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.01, 1),
  },
  dot: {
    flex: '0 0 auto',
    borderRadius: '50%',
    width: 15,
    height: 15,
    marginRight: theme.spacing(1),
  }
}));

const CATEGORY_COLORS = {
  'Original Points': '#5c53a5',
  'Point Cluster 10 or less': '#a059a0',
  'Point Cluster 100 or less': '#ce6693',
  'Point Cluster 100 or more': '#eb7f86'
};


export default function Listings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedListings, setListings] = useState();

  useEffect(() => {
    dispatch(addSource(listingsSource));
    dispatch(
      addLayer({
        id: LISTINGS_LAYER_ID,
        source: listingsSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(LISTINGS_LAYER_ID));
      dispatch(removeSource(listingsSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      addLayer({
        id: CLUSTER_LAYER_ID,
        source: selectedListings
      }),
    );

    return () => {
      dispatch(removeLayer(CLUSTER_LAYER_ID));
    };
  }, [dispatch]);

  return (
    <Grid container direction='column' className={classes.listings}>
      <h3 className={classes.title} variant='caption'>
        Point Legend
      </h3>
      {Object.entries(CATEGORY_COLORS).map((elem, i) => (
        <Grid
          container
          direction='row'
          alignItems='center'
          className={classes.element}
          key={i}
        >
          <div
            className={classes.dot}
            style={{
              backgroundColor: elem[1],
            }}
          />
          <h3>{elem[0]}</h3>
        </Grid>
      ))}
      <FormulaWidget
        id='CountListings'
        title='Count of Airbnb Listings'
        dataSource={listingsSource.id}
        column='listing_count'
        operation={AggregationTypes.SUM}
      />
      <FormulaWidget
        id='avglisting'
        title='Avg Listing Price'
        dataSource={listingsSource.id}
        column='avg_price'
        operation={AggregationTypes.AVG}
        formatter={currencyFormatter}
      />
      <FormulaWidget
        id='avgrating'
        title='Avg List Rating'
        dataSource={listingsSource.id}
        column='avg_review_score'
        operation={AggregationTypes.AVG}
        formatter={numberFormatter}
      />
      <ScatterPlotWidget
        id="RatingPrice"
        title="Ratings and Price Comparison"
        dataSource={listingsSource.id}
        xAxisColumn="avg_review_score"
        yAxisColumn="avg_price"
      />
    </Grid>
  );
}
