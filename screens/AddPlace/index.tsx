import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlaceForm } from '../../components/PlaceForm';
import { usePlaces } from '../../contexts/places';
import { Place } from '../../models/place';
import { RootParamList } from '../../types/navigation';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

type NavigationProps = NativeStackNavigationProp<RootParamList, 'AddPlace'>;

export const AddPlace: FC<IProps> = ({ style }) => {
  const navigation = useNavigation<NavigationProps>();
  const { addPlace } = usePlaces();

  const onPlaceAdded = useCallback((place: Place) => {
    addPlace(place);
    navigation.navigate('AllPlaces');
  }, [addPlace, navigation]);

  return <PlaceForm style={ style } onSubmit={ onPlaceAdded } />;
};
