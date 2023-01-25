import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Badges = ({navigation, route}) => {
  const chalNames = {Sl_1: "NoPhoneBeforeBed",
    Sl_2: "Dim Lights 3h Before Bed",
    Sl_3: "Regular Sleep",
    Sl_4: "No Coffe 8h Before Bed",
    Sl_5: "No Large Meals Before Bed",
    Sl_6: "No Alcohol Before Bed",
    Sl_7: "No Nap After 3pm",
    Sl_8: "Natural Light 30 Mins",
    Sl_9: "Optimised Bedroom Env",
    Sl_10: "Unwind Before Bed"
  }
  const userInfo = route.params

  useEffect(()=>{
    getUserData(userInfo).then(({medals})=>{
    console.log(medals,"<<medals")
    })
  },[])

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    <Text style={{fontSize:26}}>Badges</Text>
    </View>
  )
}

export default Badges

const styles = StyleSheet.create({})