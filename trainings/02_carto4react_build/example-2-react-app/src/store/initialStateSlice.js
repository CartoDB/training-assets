import { VOYAGER } from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 34.052235,
    longitude: -118.243683,
    zoom: 8,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: VOYAGER,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    accessToken:
      'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfN3hoZnd5bWwiLCJqdGkiOiI1NmFhZjdhYSJ9.fkF8KOZ2m4gcpoNtABFcCA1yzjK6ml-jJWhPXKRV8iQ',
  },
  googleApiKey: '',
  googleMapId: '',
};
