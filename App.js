import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, LogBox} from 'react-native';

import ListTrips from './screen/ListTrips';
import EditTrip from './screen/EditTrip';
import CreateTrip from './screen/CreateTrip';

LogBox.ignoreLogs(['Warning: ...']);

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <StatusBar backgroundColor="#264d9b" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // headerStyle: {
            //   backgroundColor: '#264d9b',
            // },
            // headerTintColor: '#fff',
            headerShown: false,
          }}>
          <Stack.Screen
            name="ListTrips"
            component={ListTrips}
            options={{
              // title: 'Expense Management',
              // headerTitleAlign: 'center',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditTrip"
            component={EditTrip}
            options={{
              // title: 'Edit Trip',
              // headerTitleAlign: 'center',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateTrip"
            component={CreateTrip}
            options={{
              // title: 'Create Trip',
              // headerTitleAlign: 'center',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
