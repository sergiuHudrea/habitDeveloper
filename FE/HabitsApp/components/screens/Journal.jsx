import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getUserData } from '../../apis'

const Journal = ({navigation, }) => {
  
  useEffect(()=>{
    getUserData()
  })
  
  
  
  
  
  
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text style={{fontSize:26}}>Journal</Text>
    </View>
  )
}

export default Journal

const styles = StyleSheet.create({})