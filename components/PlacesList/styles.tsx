import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noPlacesFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPlacesFoundText: {
    color: theme.colors.primary['200'],
    fontSize: 18,
    fontWeight: 'bold',
  }
});