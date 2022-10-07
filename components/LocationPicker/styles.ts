import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    marginVertical: 8,
    backgroundColor: theme.colors.primary['100'],
    borderRadius: 4,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
