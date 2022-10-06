import { StatusBar } from 'expo-status-bar';
import { PlacesProvidor } from './contexts/places';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllPlaces } from './screens/AllPlaces';
import { AddPlace } from './screens/AddPlace';
import { DefaultStackHeaderOptions } from './config/screen';
import { IconButton } from './components/buttons/IconButton';

const StackNavigator = createNativeStackNavigator();

export default function App() {
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
          </StackNavigator.Navigator>
        </NavigationContainer>
      </PlacesProvidor>
    </>
  );
}
