import { useEffect } from 'react';
import {createDatabase} from './Database';
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import NewAddress from './NewAddress';
import Map from './Map';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    createDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Places" component={NewAddress} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}