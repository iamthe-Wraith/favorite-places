import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { FC, useCallback, useState } from 'react';
import { View, ViewStyle, StyleProp, Alert, Image, Text } from 'react-native';
import { getLocationPreviewUrl } from '../../utils/location';
import { OutlinedButton } from '../buttons/OutlinedButton';
import { styles } from './styles';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

interface ILocation {
  lat: number;
  lng: number;
}

export const LocationPicker: FC<IProps> = ({ style }) => {
  const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
  const [location, setLocation] = useState<ILocation>(null);

  const verifyPermission = useCallback(async () => {
    if (locationPermissionInfo.status === PermissionStatus.GRANTED ) return true;
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert('Permission needed', 'You need to grant location permissions to use this app');
      return false;
    }

    const { status } = await requestPermission();

    return status === PermissionStatus.GRANTED;
  }, [locationPermissionInfo, requestPermission]);

  const onUseMyLocationPress = useCallback(async () => {
    const hasPermissions = await verifyPermission();
    if (!hasPermissions) return;

    const currentLocation = await getCurrentPositionAsync();

    setLocation({ lat: currentLocation.coords.latitude, lng: currentLocation.coords.longitude });
  }, [verifyPermission]);

  const onPickOnMapPress = useCallback(() => {
    console.log('Pick on map');
  }, [verifyPermission]);

  return (
    <View style={ [styles.container, style] }>
      <View style={ styles.mapPreview }>
        {
          location
            ? <Image source={ {uri: getLocationPreviewUrl(location.lat, location.lng) } } style={ styles.map } />
            : <Text>No Location Found</Text>
        }
      </View>
      <View style={ styles.buttonsContainer }>
        <OutlinedButton
          icon='location'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onPress={ onUseMyLocationPress }
        >
          Use My Location
        </OutlinedButton>
        <OutlinedButton
          icon='map'
          onPress={ onPickOnMapPress }
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};
