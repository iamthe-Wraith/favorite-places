import { GOOGLE_LOCATION_API_KEY } from 'react-native-dotenv';

interface IReverseGeocodingResponse {
  results: [{
    formatted_address: string;
  }]
}

export const getLocationPreviewUrl = (lat: number, lng: number) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${GOOGLE_LOCATION_API_KEY}`;
};

export const getAddressFromCoords = async (lat: number, lng: number) => {
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_LOCATION_API_KEY}`);

  if (!res.ok) throw new Error('Failed to fetch address.');

  const data = await res.json() as IReverseGeocodingResponse;
  return data.results[0].formatted_address;
};