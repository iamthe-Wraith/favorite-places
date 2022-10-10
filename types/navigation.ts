
export interface ILocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export type RootParamList = {
  AllPlaces: undefined;
  AddPlace: { selectedLocation: ILocation };
  Map: ILocation;
}