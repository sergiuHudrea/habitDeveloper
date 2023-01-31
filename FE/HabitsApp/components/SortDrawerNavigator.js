import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'

import MainContainer from './screens/MainContainer';
import Journal from './screens/Journal';
const Drawer = createDrawerNavigator();




const SortDrawerNavigator = ({route}) => {
   

  return (
   <Drawer.Navigator>
    <Drawer.Screen name='Journal'>
        <Journal/>
        </Drawer.Screen>
   </Drawer.Navigator>
        
  )
}

export default SortDrawerNavigator

const styles = StyleSheet.create({})