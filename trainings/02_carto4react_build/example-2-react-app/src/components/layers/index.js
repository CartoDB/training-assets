import ListingsLayer from './ListingsLayer';
import ClusterLayer from './ClusterLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    ListingsLayer(),
    ClusterLayer(),
    // [hygen] Add layer
  ];
};
