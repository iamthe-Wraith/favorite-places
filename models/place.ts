import { ILocation } from '../types/place';

export class Place {
  private _address: string;
  private _coords: { latitude: number, longitude: number };

  constructor(
    public id: string,
    public title: string,
    public imageUri: string,
    public location: ILocation,
  ) {
    this._address = location.address;
    this._coords = { latitude: location.latitude, longitude: location.longitude };
  }

  get address() { return this._address; }
  get coords() { return this._coords; }
}