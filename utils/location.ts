import { GOOGLE_LOCATION_API_KEY } from 'react-native-dotenv';

export const getLocationPreviewUrl = (lat: number, lng: number) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${GOOGLE_LOCATION_API_KEY}`;
};