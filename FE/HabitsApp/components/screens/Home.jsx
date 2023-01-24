import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from "react"
import { MyCalendar } from './Secondary_Components/MyCalendar'


const Home = ({navigation})=>{
    const [selectedDay, setSelectedDay] = useState({"dateString": "", "day": undefined, "month": undefined, "timestamp": undefined, "year": undefined})
    //from api require all challenges
    const challenges = {
      take10minWalk: {times: 1, days:['','']}
    }

    return (
       
      <View>
          <MyCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          <View>
          <Text>Today's challenges:</Text>
          <ScrollView horizontal={true}>
          <Text>Challenge 1</Text>
          <Text>Challenge 2</Text>
          <Text>Challenge 3</Text>
          <Text>Challenge 4</Text>
          <Text>Challenge 1</Text>
          <Text>Challenge 2</Text>
          <Text>Challenge 3</Text>
          <Text>Challenge 4</Text>
          <Text>Challenge 1</Text>
          <Text>Challenge 2</Text>
          <Text>Challenge 3</Text>
          <Text>Challenge 4</Text>
          <Text>Challenge 1</Text>
          <Text>Challenge 2</Text>
          <Text>Challenge 3</Text>
          <Text>Challenge 4</Text>
          </ScrollView></View>
      </View>
       
    )
} 

export default Home

const styles = StyleSheet.create({})