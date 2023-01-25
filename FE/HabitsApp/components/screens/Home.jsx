import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import { useState } from "react"
import { MyCalendar } from './Secondary_Components/MyCalendar'
import { getUserData } from '../../apis'
import { ChallengeCard } from './Secondary_Components/ChallengeCard'
import { MyHomeStats } from './Secondary_Components/MyHomeStats'


const Home = ({navigation, route})=>{
    const [selectedDay, setSelectedDay] = useState({"dateString": "", "day": undefined, "month": undefined, "timestamp": undefined, "year": undefined})
    const [challenges, setChallenges] = useState([])
    const userInfo = route.params


    useEffect(()=>{
      getUserData(userInfo).then((userData)=>{
        setChallenges(Object.keys(userData.challenges))
      })
    },[selectedDay])

    return (
       
      <View>
          <MyCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          <View>
          <Text style={styles.todaysChal}>Today's challenges:</Text>
          <ScrollView style={styles.cards} horizontal={true}>
          { (challenges.length !== 0) &&
              challenges.map((chal)=>{
                  return <ChallengeCard key={chal} chal={chal}/>
              })
          }
          </ScrollView></View>
          <MyHomeStats></MyHomeStats>
      </View>
       
    )
} 

export default Home

const styles = StyleSheet.create({
  cards: {},
  todaysChal: {margin: 10, fontSize: 18}
})