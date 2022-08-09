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
    'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfN3hoZnd5bWwiLCJqdGkiOiI0MGE0YjVlOSJ9.zihu4htlvhk-HElmcKL_V29Ug829Z_n2ITR4cNm_2IA',
  },
  googleApiKey: '',
  googleMapId: '',
};