import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import { useState } from "react"
import { MyCalendar } from './Secondary_Components/MyCalendar'
import { getUserData } from '../../apis'
import { ChallengeCard } from './Secondary_Components/ChallengeCard'

const Home = ()=>{
    const [selectedDay, setSelectedDay] = useState({"dateString": "", "day": undefined, "month": undefined, "timestamp": undefined, "year": undefined})
    const [challenges, setChallenges] = useState([])

    useEffect(()=>{
      getUserData().then((userData)=>{
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
      </View>
    )
} 

export default Home

const styles = StyleSheet.create({
  cards: {},
  todaysChal: {margin: 10, fontSize: 18}
})