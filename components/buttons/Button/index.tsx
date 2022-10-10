import { FC } from 'react';
import { Pressable, ViewStyle, StyleProp, Text } from 'react-native';
import { styles } from './styles';

interface IProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: FC<IProps> = ({ children, onPress, disabled, style }) => {
  return (
    <Pressable onPress={ onPress } style={ ({pressed}) => [styles.container, pressed && styles.pressed, disabled && styles.disabled, style] }>
      <Text style={ styles.text }>{ children }</Text>
    </Pressable>
  );
};
