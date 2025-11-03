import { useMap as useMapContext } from '../contexts/MapContext';

export const useMap = () => {
  return useMapContext();
};

