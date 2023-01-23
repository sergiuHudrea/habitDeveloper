import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './components/screens/LogIn';
import Home from './components/screens/Home';
const Stack = createNativeStackNavigator();




export default function App() {
  return (
            <Home/>
        // <NavigationContainer>
        //   <Stack.Navigator>
        //     <Stack.Screen
        //     options={{ headerShown:false}}
        //       name="LogIn"
        //       component={LogIn}
        //     />
        //     <Stack.Screen
        //       name="Home"
        //       component={Home}
        //     />
        //   </Stack.Navigator>
        // </NavigationContainer>
      );
    };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
