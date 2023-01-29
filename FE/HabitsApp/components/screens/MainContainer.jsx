import * as React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
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

export default function MainContainer({navigation, route}) {
  const userInfo = route.params

  return (
      <Tab.Navigator  initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
            size= focused ? size + 9 : size + 2;

          } else if (rn === habitsName) {
            iconName = focused ? 'list' : 'list-outline';
            size= focused ? size + 9 : size + 2;
          } else if (rn === journalName) {
            iconName = focused ? 'book' : 'book-outline';
            size= focused ? size + 9 : size + 2;
          }else if (rn === badgesName) {
            iconName = focused ? 'ribbon' : 'ribbon-outline';
            size= focused ? size + 9 : size + 2;
          }
    
          return <Ionic name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#345772',
        inactiveTintColor: 'black',
        showLabel:false,
      }}
      
      
      >
        <Tab.Screen options={{ headerShown:false}} name={homeName} component={Home} initialParams={userInfo}/>
        <Tab.Screen options={{ headerShown:false}} name={habitsName} component={MoreHabits} initialParams={userInfo}/>
        <Tab.Screen options={{ headerShown:false}} name={journalName} component={Journal} initialParams={userInfo}/>
        <Tab.Screen options={{ headerShown:false}} name={badgesName} component={Badges} initialParams={userInfo}/>
      </Tab.Navigator>

    
  );
}