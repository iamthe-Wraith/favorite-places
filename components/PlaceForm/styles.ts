import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  input: {
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 16,
    borderBottomColor: theme.colors.primary['700'],
    borderBottomWidth: 2,
    backgroundColor: theme.colors.primary['100'],
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary['500'],
  }
});
