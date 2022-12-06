import { DARK_MATTER } from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 31.802892,
    longitude: -103.007813,
    zoom: 2,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
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
