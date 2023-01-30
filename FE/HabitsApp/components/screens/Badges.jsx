import { Image, StyleSheet, Text, View, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../apis'

const Badges = ({navigation, route}) => {
  const [challenges, setChallenges] = useState([])
  const [badgesArr, setBadgesArr] = []
  const userInfo = route.params
  let challArray =[]

  useEffect(()=>{
    getUserData(userInfo).then((userData)=>{
      const challengeObj = userData.challenges
      challArray = Object.entries(challengeObj).map((e) => ({[e[0]]:e[1]}))
      // setChallenges(userData)
      console.log(challenges, 'challenges')
      console.log(challArray.length, 'chal array')
    })
  },[])

  const BadgeCard =({title, goldBadges, silverBadges, bronzeBadges})=>{
    <View>
    <Text>Title</Text>
    <Text>Gold Badges</Text>
    <Text>Silver Badges</Text>
    <Text>Bronze Badges</Text>
    </View>
  }

  return (
    <View>
      <ScrollView>
      {challArray.map((chal)=>{
        // console.log('hi')
        return <BadgeCard title={chal[Object.keys(chal)[0]].title} goldBadges={chal[Object.keys(chal)[0]].badges[0]} silverBadges={chal[Object.keys(chal)[0]].badges[1]} bronzeBadges={chal[Object.keys(chal)[0]].badges[2]}/>
      })
      }
      </ScrollView>
      <View><Text>hello world</Text></View>
    </View>
  )


    // <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    // {/* <Text>{chal[Object.keys(chal)[0]].title}</Text> */}
    // {/* <Image source={require("../../assets/badges/goldBadge2.png")} style={{height:100, width:100}}/>
    // <Image source={require("../../assets/badges/silverBadge.png")} style={{height:100, width:100}}/>
    // <Image source={require("../../assets/badges/bronzeBadge.png")} style={{height:100, width:100}}/>
    // </View> */}
}


export default Badges
const styles = StyleSheet.create({})