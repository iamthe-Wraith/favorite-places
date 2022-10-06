import { FC } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { PlaceForm } from '../../components/PlaceForm';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export const AddPlace: FC<IProps> = ({ style }) => {
  return (
    <PlaceForm />
  );
};
