import { FC, ReactNode } from 'react';
import { Text, ViewStyle, StyleProp, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../../styles/theme';

interface IProps {
  icon: keyof typeof Ionicons.glyphMap;
  children?: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const OutlinedButton: FC<IProps> = ({ icon, children, onPress, style }) => {
  return (
    <Pressable style={ ({ pressed }) => [styles.container, pressed && styles.pressed, style] } onPress={ onPress }>
      { icon && <Ionicons name={ icon } color={ theme.colors.primary['500'] } size={ 18 } style={ styles.icon } /> }
      <Text style={ styles.text }>{ children }</Text>
    </Pressable>
  );
};
