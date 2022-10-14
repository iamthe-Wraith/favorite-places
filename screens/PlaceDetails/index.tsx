import { FC, useCallback, useEffect, useState } from 'react';
import { Text, View, ViewStyle, StyleProp, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';
import { RootParamList } from '../../types/navigation';
import { OutlinedButton } from '../../components/buttons/OutlinedButton';
import { Place } from '../../models/place';
import { fetchPlace } from '../../utils/database';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

type NavigationProps = NativeStackNavigationProp<RootParamList, 'Map'>;
type RouteProps = RouteProp<RootParamList, 'PlaceDetails'>

export const PlaceDetails: FC<IProps> = ({ style }) => {
  const navigation = useNavigation<NavigationProps>();
  const { params } = useRoute<RouteProps>();
  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    fetchPlace(params.placeId)
      .then(p => {
        setPlace(p);
        navigation.setOptions({ title: p.title });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log('[-] error fetching place', err);
        Alert.alert('Error', 'Something went wrong');
      });
  }, [params.placeId]);

  const onViewOnMapPress = useCallback(() => {
    navigation.navigate('Map', place?.location);
  }, [place]);

  if (!place) return null;

  return (
    <ScrollView>
      <Image
        style={ styles.image }
        source={ {uri: place.imageUri} }
      />
      <View style={ styles.locationContainer }>
        <View>  
          <Text style={ styles.address }>{ place.address }</Text>
        </View>
        <OutlinedButton
          icon='map'
          onPress={ onViewOnMapPress }
        >
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};
