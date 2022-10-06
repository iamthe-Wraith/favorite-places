import { FC, useCallback } from 'react';
import { View, Text, ViewStyle, StyleProp, Image, Pressable } from 'react-native';
import { Place } from '../../models/place';
import { styles } from './styles';

interface IProps {
  place: Place;
  onPress: (place: Place) => void;
  style?: StyleProp<ViewStyle>;
}

export const PlaceItem: FC<IProps> = ({ place, onPress, style }) => {
  const onPlacePress = useCallback(() => {
    onPress(place);
  }, []);

  return (
    <Pressable style={ [styles.container, style] } onPress={ onPlacePress }>
      <Image source={ { uri: place.imageUri } } />
      <View>
        <Text>{ place.title }</Text>
        <Text>{ place.address }</Text>
      </View>
    </Pressable>
  );
};
