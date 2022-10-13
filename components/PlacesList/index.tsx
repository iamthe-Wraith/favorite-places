import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useCallback } from 'react';
import { View, Text, ViewStyle, StyleProp, FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Place } from '../../models/place';
import { RootParamList } from '../../types/navigation';
import { PlaceItem } from '../PlaceItem';
import { styles } from './styles';

interface IProps {
  places: Place[];
  style?: StyleProp<ViewStyle>;
}

type NavigationProps = NativeStackNavigationProp<RootParamList, 'PlaceDetails'>;

export const PlacesList: FC<IProps> = ({ places, style }) => {
  const navigation = useNavigation<NavigationProps>();

  const onPlacePress = useCallback((place: Place) => {
    navigation.navigate('PlaceDetails', { placeId: place.id });
  }, []);

  const renderPlace: ListRenderItem<Place> = useCallback(({ item }) => (
    <PlaceItem
      place={ item }
      onPress={ onPlacePress }
    />
  ), []);

  if (!places?.length) {
    return (
      <View style={ styles.noPlacesFound }>
        <Text style={ styles.noPlacesFoundText }>no places found</Text>
      </View>
    );
  }
 
  return (
    <FlatList
      style={ [styles.container, style] }
      data={ places }
      renderItem={ renderPlace }
      keyExtractor={ item => item.id }
    />
  );
};
