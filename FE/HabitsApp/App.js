import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './components/screens/LogIn';
import Register from './components/screens/Register';
import MainContainer from './components/screens/MainContainer'
import HabitDetail from './components/screens/HabitDetail';
import AddJournal from './components/AddJournal';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const Stack = createNativeStackNavigator();


export default function App() {
  
  return ( 
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
            options={{ headerShown:false}}
              name="Log In"
              component={LogIn}
            /> 
             <Stack.Screen
             options={{ headerShown:false}}
              name="Register"
              component={Register}
            />
             <Stack.Screen
             options={{ headerShown:false}}
              name="MainContainer"
              component={MainContainer}
            />
             <Stack.Screen
             options={{ headerShown:false}}
              name="Habit Detail"
              component={HabitDetail}
            />
            <Stack.Screen
             options={{ headerShown:false}}
              name="Add Journal"
              component={AddJournal}
            />
          </Stack.Navigator>
        </NavigationContainer> 
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
