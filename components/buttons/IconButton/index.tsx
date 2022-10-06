import { FC } from 'react';
import { Pressable, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface IProps {
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const IconButton: FC<IProps> = ({ color, icon, size = 24, style, onPress }) => {
  return (
    <Pressable onPress={ onPress } style={ ({pressed}) => [styles.container, pressed && styles.pressed, style] }>
      <Ionicons name={ icon } color={ color } size={ size } />
    </Pressable>
  );
};
