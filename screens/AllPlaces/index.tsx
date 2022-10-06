import { FC } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { PlacesList } from '../../components/PlacesList';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export const AllPlaces: FC<IProps> = ({ style }) => {
  return (
    <PlacesList
      places={ [] }
    />
  );
};
