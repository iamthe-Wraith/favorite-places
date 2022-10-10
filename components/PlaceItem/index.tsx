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
    <Pressable style={ ({ pressed }) => [styles.container, pressed && styles.pressed, style] } onPress={ onPlacePress }>
      <Image style={ styles.image } source={ { uri: place.imageUri } } />
      <View style={ styles.infoContainer }>
        <Text style={ styles.title }>{ place.title }</Text>
        <Text style={ styles.address }>{ place.address }</Text>
      </View>
    </Pressable>
  );
};
