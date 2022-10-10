import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: theme.colors.primary['500'],
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    height: 100,
  },
  infoContainer: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.neutral['700'],
  },
  address: {
    fontSize: 12,
    color: theme.colors.neutral['700'],
  }
});
