import { DARK_MATTER } from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 40.4167754,
    longitude: -3.7037902,
    zoom: 4,
    pitch: 35,
    bearing: 0,
    dragRotate: true,
  },
  basemap: DARK_MATTER,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    accessToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfa2hpdnRreGkiLCJqdGkiOiIyMTcyZWNiMiJ9.qkqX3c0Y6WtFQA-v-PXQq33YVgATYHWtXSGtoIarwrY',
  },
  googleApiKey: '', // only required when using a Google Basemap
  googleMapId: '', // only required when using a Google Custom Basemap
};
