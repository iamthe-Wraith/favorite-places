import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { theme } from '../styles/theme';

const DefaultHeaderOptions = {
  headerStyle: { backgroundColor: theme.colors.primary['500'] },
  headerTintColor: theme.colors.neutral['700'],
  contentStyle: { backgroundColor: theme.colors.neutral['700'] },
};

export const DefaultStackHeaderOptions: NativeStackNavigationOptions = {
  ...DefaultHeaderOptions,
};