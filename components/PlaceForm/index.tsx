import { FC, useCallback, useState } from 'react';
import { View, Text, ViewStyle, StyleProp, ScrollView, TextInput } from 'react-native';
import { Place } from '../../models/place';
import { ILocation } from '../../types/navigation';
import { Button } from '../buttons/Button';
import { ImagePicker } from '../ImagePicker';
import { LocationPicker } from '../LocationPicker';
import { styles } from './styles';

interface IProps {
  onSubmit(place: Place): void;
  style?: StyleProp<ViewStyle>;
}

export const PlaceForm: FC<IProps> = ({ onSubmit, style }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState<ILocation>();

  const reset = useCallback(() => {
    setTitle('');
    setImage('');
    setLocation(undefined);
  }, []);

  const onImagePicked = useCallback((image: string) => {
    setImage(image);
  }, []);

  const onLocationPicked = useCallback((location: ILocation) => {
    setLocation(location);
  }, []);

  const onSavePress = useCallback(() => {
    const place = new Place(title, image, location);
    reset();
    onSubmit(place);
  }, [title, image, location]);

  const onTitleChange = useCallback((val: string) => {
    setTitle(val);
  }, []);

  return (
    <ScrollView style={ [styles.container, style] }>
      <View>
        <Text style={ styles.label }>Title</Text>
        <TextInput
          onChangeText={ onTitleChange }
          value={ title }
          style={ styles.input }
        />
      </View>
      <ImagePicker onImagePicked={ onImagePicked } />
      <LocationPicker onLocationPicked={ onLocationPicked } />
      <Button
        onPress={ onSavePress }
        disabled={ !title || !image || !location?.address }
      >
        Save Place
      </Button>
    </ScrollView>
  );
};
