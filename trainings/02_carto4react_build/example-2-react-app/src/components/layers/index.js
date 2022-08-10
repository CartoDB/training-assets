import ListingsLayer from './ListingsTilesetLayer';
import ClusterLayer from './ClusterLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    ListingsLayer(),
    ClusterLayer(),
    // [hygen] Add layer
  ];
};
