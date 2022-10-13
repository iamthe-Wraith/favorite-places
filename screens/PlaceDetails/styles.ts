import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    padding: 20,
  },
  address: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary['500'],
    textAlign: 'center',
  }
});
