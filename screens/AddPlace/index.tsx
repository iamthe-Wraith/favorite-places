import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { ViewStyle, StyleProp, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlaceForm } from '../../components/PlaceForm';
import { usePlaces } from '../../contexts/places';
import { RootParamList } from '../../types/navigation';
import { ILocation } from '../../types/place';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

type NavigationProps = NativeStackNavigationProp<RootParamList, 'AddPlace'>;

export const AddPlace: FC<IProps> = ({ style }) => {
  const navigation = useNavigation<NavigationProps>();
  const { addPlace } = usePlaces();

  const onPlaceAdded = useCallback(async (title: string, imageUri: string, location: ILocation) => {
    try {
      await addPlace(title, imageUri, location);
      navigation.navigate('AllPlaces');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('[-] error adding place', err);
      Alert.alert('Something went wrong!', 'Could not add place.');
    }
  }, [addPlace, navigation]);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <PlaceForm style={ style } onSubmit={ onPlaceAdded } />;
};
