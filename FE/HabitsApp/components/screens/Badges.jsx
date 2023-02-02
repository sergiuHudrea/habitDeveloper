import { Image, StyleSheet, Text, View, FlatList, ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../apis'

const Badges = ({navigation, route}) => {
  const [challenges, setChallenges] = useState([])
  const userInfo = route.params

  useEffect(()=>{
    getUserData(userInfo).then((userData)=>{
      const challArray = Object.keys(userData.challenges).map(key=>userData.challenges[key])
      setChallenges(challArray)
    })
  },[])


  const BadgeCard =({title, badges})=>{
    let badgeDisplay = []

    if(badges[2]>0){
      for (let i=0; i<badges[2]; i++){
        badgeDisplay.push(<Image key={Math.random()} source={require("../../assets/badges/goldBadge2.png")} style={{height:100, width:100}}/>)
      }
    }
    if(badges[1]>0){
      for (let i=0; i<badges[1]; i++){
        badgeDisplay.push(<Image key={Math.random()} source={require("../../assets/badges/silverBadge.png")} style={{height:100, width:100}}/>)
      }
    }
    if(badges[0]>0){
      for (let i=0; i<badges[0]; i++){
        badgeDisplay.push(<Image key={Math.random()} source={require("../../assets/badges/bronzeBadge.png")} style={{height:100, width:100}}/>)
      }
    }
    if(badgeDisplay.length === 0) {
      badgeDisplay.push(<Image key={Math.random()} source={require("../../assets/badges/badgeimage1.png")} style={{height:100, width:100}}/>)
    }
    
    return (
      <SafeAreaView style={styles.everything}>
      <View style={styles.item}>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text>{`Gold: ${badges[2]}    Silver: ${badges[1]}    Bronze: ${badges[0]}`}</Text>
      </View>
      <ScrollView horizontal={true}>
      {badgeDisplay.map((badge)=>{
        return badge
      })}
      </ScrollView>
      </View>
      </SafeAreaView>
    )}


  return (
    <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    <FlatList showsVerticalScrollIndicator={false} numColumns={1} style={styles.container} data={challenges}
    renderItem={({item}) => <BadgeCard title={item.title} badges={item.badges}/>
    }/>
    </SafeAreaView>
  )
}
export default Badges


const styles = StyleSheet.create({
  item: {
    height: 210,
    borderTopWidth: 4,
    borderColor: "#55BEDF",
    marginHorizontal: 20,
    marginVertical: 4,
    padding: 20,
    borderRadius: 0,
    shadowOffset: {width:0, height:5},
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5
  },
  text:{
    marginBottom: 7
  },
  everything:{
    backgroundColor: "white"
  }
})
