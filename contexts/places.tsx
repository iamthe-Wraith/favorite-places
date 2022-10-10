import { createContext, FC, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { Place } from '../models/place';

interface IPlacesContext {
  places: Place[];
  addPlace: (place: Place) => void;
}

interface IProps {
  children: ReactNode;
}

const PlacesContext = createContext<IPlacesContext>(null);

export const usePlaces = () => useContext(PlacesContext);

export const PlacesProvidor: FC<IProps> = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>([]);

  const addPlace = useCallback((place: Place) => {
    setPlaces((prevPlaces) => [...prevPlaces, place]);
  }, []);

  const value = useMemo(() => ({
    places,
    addPlace,
  }), [places]);

  return (
    <PlacesContext.Provider value={ value }>
      { children }
    </PlacesContext.Provider>
  );
};