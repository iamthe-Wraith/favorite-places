import { FC, useCallback, useState } from 'react';
import { View, Text, ViewStyle, StyleProp, ScrollView, TextInput } from 'react-native';
import { ImagePicker } from '../ImagePicker';
import { styles } from './styles';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export const PlaceForm: FC<IProps> = ({ style }) => {
  const [title, setTitle] = useState('');

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
      <ImagePicker />
    </ScrollView>
  );
};
