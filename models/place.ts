interface IPlaceLocation {
  lat: number;
  lng: number;
}



export class Place {
  private _id: string;

  constructor(
    public title: string,
    public imageUri: string,
    public address: string,
    public location: IPlaceLocation
  ) {
    this._id = new Date().toString() + Math.random().toString();
  }

  get id() { return this._id; }
}