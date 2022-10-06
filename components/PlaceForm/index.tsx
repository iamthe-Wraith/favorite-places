import { FC } from 'react';
import { View, Text, ViewStyle, StyleProp } from 'react-native';
import { styles } from './styles';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export const PlaceForm: FC<IProps> = ({ style }) => {
  return (
    <View style={ [styles.container, style] }>
      <Text>temp PlaceForm</Text>
    </View>
  );
};
