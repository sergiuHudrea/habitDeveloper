import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect } from 'react'
import { useState } from "react"
import { MyCalendar } from './Secondary_Components/MyCalendar'
import { getUserData } from '../../apis'
import { ChallengeCard } from './Secondary_Components/ChallengeCard'
import { MyHomeStats } from './Secondary_Components/MyHomeStats'


const Home = ({navigation, route})=>{
    const [selectedDay, setSelectedDay] = useState(new Date())
    const [challenges, setChallenges] = useState([])
    const [firstTimeUser, setFirstTimeUser] = useState(false)
    const [ongoingChallengesArr, setOngoingChallengesArr] = useState([])
    const userInfo = route.params

    useEffect(()=>{
      getUserData(userInfo).then((userData)=>{
        // const challCodes = Object.keys(userData.challenges)
        const challengeObj = userData.challenges
        const challArray = Object.entries(challengeObj).map((e) => ({[e[0]]:e[1]})); //converts to arr of objs
        setChallenges(challArray)
        const activeChallenges = challenges.filter((chal)=>{
          return Boolean(chal[Object.keys(chal)[0]].times)
        })
        setOngoingChallengesArr(activeChallenges)
        console.log(ongoingChallengesArr, 'active challs')
        if (ongoingChallengesArr.length === 0){
          setFirstTimeUser(true)
        } else {
          setFirstTimeUser(false)
        }
      })
    },[selectedDay])


    return (
      <View>
          <MyCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          <View>
          <Text style={styles.todaysChal}>Challenges:</Text>
          {(!firstTimeUser && <ScrollView style={styles.cards} horizontal={true}>
          { (challenges.length !== 0) &&
              challenges.map((chal)=>{
                  return <ChallengeCard key={Math.random()} chal={chal} selectedDay={selectedDay} navigation={navigation} userInfo={userInfo}/>
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
          <MyHomeStats ongoingChallengesArr={ongoingChallengesArr}/>
      </View>
       
    )
} 

export default Home

const styles = StyleSheet.create({
  cards: {},
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