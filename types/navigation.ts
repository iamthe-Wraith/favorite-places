import { ILocation } from './place';

export type RootParamList = {
  AllPlaces: undefined;
  AddPlace: { selectedLocation: ILocation };
  Map: ILocation;
  PlaceDetails: { placeId: string };
}