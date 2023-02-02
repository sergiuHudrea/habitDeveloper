import { ScrollView, StyleSheet, Text, TouchableOpacity,View,SafeAreaView } from 'react-native'
import { useEffect } from 'react'
import { useState } from "react"
import { MyCalendar } from './Secondary_Components/MyCalendar'
import { getUserData } from '../../apis'
import { ChallengeCard } from './Secondary_Components/ChallengeCard'
import { MyHomeStats } from './Secondary_Components/MyHomeStats'
import Loader from '../Loader'

const Home = ({navigation, route})=>{
    const [selectedDay, setSelectedDay] = useState(new Date())
    const [challenges, setChallenges] = useState([])
    const [firstTimeUser, setFirstTimeUser] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const userInfo = route.params
    let ongoingChallengesArr =[]

    const [refreshing, setRefreshing] = useState(false);

    useEffect(()=>{

      setIsLoading(true)
      getUserData(userInfo).then((userData)=>{
        const challengeObj = userData.challenges
        const challArray = Object.entries(challengeObj).map((e) => ({[e[0]]:e[1]})); //converts to arr of objs

        setChallenges(challArray)
        ongoingChallengesArr = challenges.filter((chal)=>{
          return chal[Object.keys(chal)[0]].times !== null
        })
        if (ongoingChallengesArr.length === 0){setFirstTimeUser(true)} else {setFirstTimeUser(false)}    
      })
      setIsLoading(false)
    },[selectedDay, refreshing])
    


    return isLoading ? (
      <Loader />
    ):(
      <SafeAreaView style={{flex:1}}>
          <MyCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          <View>
          <Text style={styles.todaysChal}>Today's Challenges:</Text>
          {(!firstTimeUser && <ScrollView style={styles.cards} horizontal={true}>
          { (challenges.length !== 0) &&
              challenges.map((chal)=>{
                  return <ChallengeCard  setRefreshing={setRefreshing} setChallenges={setChallenges} key={Math.random()} chal={chal} selectedDay={selectedDay} navigation={navigation} userInfo={userInfo}/>
              })
          }
          </ScrollView>)}
          {(firstTimeUser && <View style={styles.buttonView}><TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Habits')}
                style={styles.button}
                ><Text style={styles.buttonText}>Start new challenges!</Text>
            </TouchableOpacity></View>
            )}
          </View>
           <MyHomeStats setRefreshing={setRefreshing} refreshing={refreshing} challenges={challenges} />
      </SafeAreaView>
    )
} 

export default Home

const styles = StyleSheet.create({
  cards: {padding: 10},
  todaysChal: {margin: 10, fontSize: 18},
  button: {
    borderWidth:10,
    borderColor:'#AFC9CA',
    alignItems:'center',
    justifyContent:'center',
    width:200,
    height:200,
    backgroundColor:'#78ACB1',
    borderRadius:100,},
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: "bold"
  },
  buttonView:{
    alignItems:'center',
    justifyContent:'center',
  },
})