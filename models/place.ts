import { ILocation } from '../types/navigation';

export class Place {
  private _id: string;
  private _address: string;
  private _coords: { latitude: number, longitude: number };

  constructor(
    public title: string,
    public imageUri: string,
    public location: ILocation,
  ) {
    this._id = new Date().toString() + Math.random().toString();
    this._address = location.address;
    this._coords = { latitude: location.latitude, longitude: location.longitude };
  }

  get id() { return this._id; }
  get address() { return this._address; }
  get coords() { return this._coords; }
}