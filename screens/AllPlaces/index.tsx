import { FC } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { PlacesList } from '../../components/PlacesList';
import { usePlaces } from '../../contexts/places';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export const AllPlaces: FC<IProps> = ({ style }) => {
  const {places} = usePlaces();

  return (
    <PlacesList
      style={ style }
      places={ places }
    />
  );
};
