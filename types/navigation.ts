
export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export type RootParamList = {
  AllPlaces: undefined;
  AddPlace: { selectedLocation: ICoordinates };
  Map: ICoordinates;
}