import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../apis'

const Badges = ({navigation, route}) => {
  const [challenges, setChallenges] = useState([])
  const [badgesArr, setBadgesArr] = []
  const userInfo = route.params

  useEffect(()=>{
    getUserData(userInfo).then((userData)=>{
      const challengeObj = userData.challenges
      const challArray = Object.entries(challengeObj).map((e) => ({[e[0]]:e[1]}))
      setChallenges(userData)
    })
  },[])
    

  
    // const sth = challenges.map((chal)=>{
    //   })

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    {/* <Text>{chal[Object.keys(chal)[0]].title}</Text> */}
    <Image source={require("../../assets/badges/goldBadge2.png")} style={{height:100, width:100}}/>
    <Image source={require("../../assets/badges/silverBadge.png")} style={{height:100, width:100}}/>
    <Image source={require("../../assets/badges/bronzeBadge.png")} style={{height:100, width:100}}/>
    </View>
  )
}
export default Badges

const styles = StyleSheet.create({})