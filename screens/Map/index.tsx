import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ViewStyle, StyleProp, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { RootParamList } from '../../types/navigation';
import { styles } from './styles';
import { IconButton } from '../../components/buttons/IconButton';
import { ILocation } from '../../types/place';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export type NavigationProps = NativeStackNavigationProp<RootParamList, 'AddPlace'>;
type RouteProps = RouteProp<RootParamList, 'Map'>

export const Map: FC<IProps> = ({ style }) => {
  const navigation = useNavigation<NavigationProps>();
  const { params } = useRoute<RouteProps>();
  const [selectedLocation, setSelectedLocation] = useState<ILocation>(params);

  const region = useRef({
    latitude: selectedLocation?.latitude || 37.78825,
    longitude: selectedLocation?.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }).current;

  const onMapPress = useCallback((e: MapEvent) => {
    if (params) return;
    
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setSelectedLocation({ latitude, longitude });
  }, []);

  const onSavePress = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location selected', 'Please select a location on the map');
      return;
    }

    navigation.navigate('AddPlace', { selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.address || 'Select Location',
      headerRight: ({ tintColor }) => !params && (
        <IconButton
          icon='save'
          color={ tintColor }
          onPress={ onSavePress }
        />
      ),
    });
  }, [navigation, onSavePress]);
  
  return (
    <MapView
      style={ [styles.container, style] }
      initialRegion={ region }
      onPress={ onMapPress }
    >
      {
        selectedLocation && (
          <Marker 
            title='Picked Location'
            coordinate={ selectedLocation }
          />
        )
      }
    </MapView>
  );
};
