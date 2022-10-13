import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';
import { IRawPlace } from '../types/place';

const db = SQLite.openDatabase('places.db');

export const init = () => new Promise((res, rej) => {
  db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
    [],
    () => res(null),
    (_, err) => {
      rej(err);
      return false;
    },
    );
  });
});

export const insertPlace = (title: string, imageUri: string, address: string, lat: number, lng: number): Promise<Place> => new Promise((res, rej) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
      [title, imageUri, address, lat, lng],
      (_, result) => {
        const { id, title, imageUri, address, lat, lng } = result.rows._array[0] as IRawPlace;
        const place = new Place(
          id,
          title,
          imageUri,
          {
            address,
            latitude: lat,
            longitude: lng,
          }
        );
        res(place);
      },
      (_, err) => {
        rej(err);
        return false;
      },
    );
  });
});

export const fetchPlace = (placeId: string): Promise<Place> => new Promise((res, rej) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM places WHERE id = ?',
      [placeId],
      (_, result) => {
        const p = result.rows._array[0] as IRawPlace;

        const place = new Place(
          p.id, 
          p.title, 
          p.imageUri, 
          { 
            address: p.address, 
            latitude: p.lat, 
            longitude: p.lng 
          }
        );

        res(place);
      },
      (_, err) => {
        rej(err);
        return false;
      },
    );
  });
});

export const fetchPlaces = (): Promise<Place[]> => new Promise((res, rej) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM places',
      [],
      (_, result) => {
        const places = result.rows._array.map((place: IRawPlace) => new Place(
          place.id, 
          place.title, 
          place.imageUri, 
          { 
            address: place.address, 
            latitude: place.lat, 
            longitude: place.lng 
          }
        ));
        res(places);
      },
      (_, err) => {
        rej(err);
        return false;
      },
    );
  });
});
