import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { Place } from '../models/place';
import { ILocation } from '../types/place';
import { fetchPlaces, insertPlace } from '../utils/database';

interface IPlacesContext {
  places: Place[];
  addPlace: (title: string, imageUri: string, location: ILocation) => void;
}

interface IProps {
  children: ReactNode;
}

const PlacesContext = createContext<IPlacesContext>(null);

export const usePlaces = () => useContext(PlacesContext);

export const PlacesProvidor: FC<IProps> = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetchPlaces()
      .then(setPlaces)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('>>>>> error fetching places', err);
        Alert.alert('Something went wrong!', 'Could not load places.');
      });
  }, []);

  const addPlace = useCallback(async (title: string, imageUri: string, location: ILocation) => {
    const place = await insertPlace(title, imageUri, location.address, location.latitude, location.longitude);
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