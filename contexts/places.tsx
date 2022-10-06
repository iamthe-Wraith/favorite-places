import { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { Place } from '../models/place';

interface IPlacesContext {
  places: Place[];
}

interface IProps {
  children: ReactNode;
}

const PlacesContext = createContext<IPlacesContext>(null);

export const PlacesProvidor: FC<IProps> = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>([]);

  const value = useMemo(() => ({
    places,
  }), [places]);

  return (
    <PlacesContext.Provider value={ value }>
      { children }
    </PlacesContext.Provider>
  );
};