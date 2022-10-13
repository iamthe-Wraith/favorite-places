export interface IRawPlace {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
}

export interface ILocation {
  latitude: number;
  longitude: number;
  address?: string;
}