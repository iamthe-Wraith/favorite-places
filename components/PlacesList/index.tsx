import React, { FC, useCallback } from 'react';
import { View, Text, ViewStyle, StyleProp, FlatList, ListRenderItem } from 'react-native';
import { Place } from '../../models/place';
import { PlaceItem } from '../PlaceItem';
import { styles } from './styles';

interface IProps {
  places: Place[];
  style?: StyleProp<ViewStyle>;
}

export const PlacesList: FC<IProps> = ({ places, style }) => {
  const onPlacePress = useCallback((place: Place) => {
    console.log('>>>>> onPlacePress', place);
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
