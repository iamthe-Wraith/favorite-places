import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { FC, useCallback, useEffect, useState } from 'react';
import { View, ViewStyle, StyleProp, Alert, Image, Text } from 'react-native';
import { useNavigation, useRoute, useIsFocused, RouteProp } from '@react-navigation/native';
import { getAddressFromCoords, getLocationPreviewUrl } from '../../utils/location';
import { OutlinedButton } from '../buttons/OutlinedButton';
import { styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ILocation, RootParamList } from '../../types/navigation';

interface IProps {
  onLocationPicked(location: ILocation): void;
  style?: StyleProp<ViewStyle>;
}

type NavigationProps = NativeStackNavigationProp<RootParamList, 'Map'>;
type RouteProps = RouteProp<RootParamList, 'AddPlace'>

export const LocationPicker: FC<IProps> = ({ onLocationPicked, style }) => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const isFocused = useIsFocused();
  const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
  const [location, setLocation] = useState<ILocation>(route.params?.selectedLocation || null);

  useEffect(() => {
    if (location) {
      getAddressFromCoords(location.latitude, location.longitude)
        .then(address => {
          onLocationPicked({ ...location, address });
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Alert.alert('Error', err.message as string);
        });
    }
  }, [location, onLocationPicked]);

  useEffect(() => {
    if (isFocused) setLocation(route.params?.selectedLocation || null);
  }, [isFocused, route.params?.selectedLocation]);

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

    setLocation({ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude });
  }, [verifyPermission]);

  const onPickOnMapPress = useCallback(() => {
    navigation.navigate('Map');
  }, [verifyPermission]);

  return (
    <View style={ [styles.container, style] }>
      <View style={ styles.mapPreview }>
        {
          location
            ? <Image source={ {uri: getLocationPreviewUrl(location.latitude, location.longitude) } } style={ styles.map } />
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
