import { Image, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../apis'

const Badges = ({navigation, route}) => {
  const [challenges, setChallenges] = useState([])
  const [badgesArr, setBadgesArr] = [[]]
  const userInfo = route.params

  useEffect(()=>{
    getUserData(userInfo).then((userData)=>{
      const challArray = Object.keys(userData.challenges).map(key=>userData.challenges[key])
      setChallenges(challArray)
      console.log(challArray[9])
    })
  },[])
    
    console.log(challenges)


  const BadgeCard =({title, badges})=>(
    <View style={styles.item}>
      <Text>{title}</Text>
      <Text>{badges}</Text>
      <Image source={require("../../assets/badges/silverBadge.png")} style={{height:100, width:100}}/>
    </View>
  )

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    <FlatList showsVerticalScrollIndicator={false} numColumns={1} style={styles.container} data={challenges}
    renderItem={({item}) => <BadgeCard title={item.title} badges={item.badges}/>
    }/>
    </View>
  )
  // {/* <View }}>
  //     {/* <Text>{chal[Object.keys(chal)[0]].title}</Text> */}
  //     <Text>{challenges[0]}</Text>
  //     <Image source={require("../../assets/badges/goldBadge2.png")} style={{height:100, width:100}}/>
  //     <Image source={require("../../assets/badges/silverBadge.png")} style={{height:100, width:100}}/>
  //     <Image source={require("../../assets/badges/bronzeBadge.png")} style={{height:100, width:100}}/>
  //     </View> */}
}
export default Badges


const styles = StyleSheet.create({
  item: {
    height: 130,
  }
})