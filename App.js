import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, LogBox} from 'react-native';

import ListTrips from './screen/ListTrips';
import EditTrip from './screen/EditTrip';
import CreateTrip from './screen/CreateTrip';

LogBox.ignoreLogs(['Warning: ...']);
console.disableYellowBox = true;

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <StatusBar backgroundColor="#264d9b" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="ListTrips"
            component={ListTrips}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditTrip"
            component={EditTrip}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateTrip"
            component={CreateTrip}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
