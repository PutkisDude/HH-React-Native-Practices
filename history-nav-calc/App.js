import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import Calc from './Calc';
import History from './History';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calc} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}