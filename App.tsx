import { StatusBar } from 'expo-status-bar';
import { PlacesProvidor } from './contexts/places';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { AllPlaces } from './screens/AllPlaces';
import { AddPlace } from './screens/AddPlace';
import { DefaultStackHeaderOptions } from './config/screen';
import { IconButton } from './components/buttons/IconButton';
import { Map } from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './utils/database';
import { Alert } from 'react-native';
import { PlaceDetails } from './screens/PlaceDetails';

const StackNavigator = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dbInitialized, setDBInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => SplashScreen.hideAsync())
      .then(() => setDBInitialized(true))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('>>>>> error initializing db', err);
        Alert.alert('Something went wrong!');
      });
  }, []);

  if (!dbInitialized) return null;

  return (
    <>
      <StatusBar style='auto' />
      <PlacesProvidor>
        <NavigationContainer>
          <StackNavigator.Navigator screenOptions={ DefaultStackHeaderOptions }>
            <StackNavigator.Screen
              name='AllPlaces'
              component={ AllPlaces }
              options={ ({ navigation }) => ({
                title: 'Favorite Places',
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon='add'
                    color={ tintColor }
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                    onPress={ () => navigation.navigate('AddPlace') }
                  />
                )
              }) }
            />
            <StackNavigator.Screen
              name='AddPlace'
              component={ AddPlace }
              options={ {
                title: 'Add a New Place'
              } }
            />
            <StackNavigator.Screen
              name='Map'
              component={ Map }
              options={ {
                title: 'Select Location'
              } }
            />
            <StackNavigator.Screen
              name='PlaceDetails'
              component={ PlaceDetails }
              options={ {
                title: 'Loading place...'
              } }
            />
          </StackNavigator.Navigator>
        </NavigationContainer>
      </PlacesProvidor>
    </>
  );
}
