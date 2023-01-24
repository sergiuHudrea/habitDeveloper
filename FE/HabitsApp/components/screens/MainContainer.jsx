import * as React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MoreHabits from './MoreHabits';
import Journal from './Journal';
import Badges from './Badges';
import Home from './Home';





const Tab = createBottomTabNavigator();
const homeName='Home';
const habitsName='Habits';
const journalName='Journal';
const badgesName='Badges';

export default function MainContainer({navigation}) {
  return (
      <Tab.Navigator initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === habitsName) {
            iconName = focused ? 'list' : 'list-outline';

          } else if (rn === journalName) {
            iconName = focused ? 'book' : 'book-outline';
          }else if (rn === badgesName) {
            iconName = focused ? 'medal' : 'medal-outline';
          }

    
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#345772',
        inactiveTintColor: 'grey',
        labelStyle: { fontSize: 10, fontWeight:'600'},
        style: { padding: 10, height: 70}
      }}>
        <Tab.Screen options={{ headerShown:false}} name={homeName} component={Home} />
        <Tab.Screen options={{ headerShown:false}} name={habitsName} component={MoreHabits} />
        <Tab.Screen options={{ headerShown:false}} name={journalName} component={Journal} />
        <Tab.Screen options={{ headerShown:false}} name={badgesName} component={Badges} />
      </Tab.Navigator>

    
  );
}