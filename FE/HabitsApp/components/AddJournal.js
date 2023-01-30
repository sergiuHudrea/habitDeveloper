import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'

const AddJournal = ({navigation, route}) => {
  const addChallengeInfo=route.params.addChallengeInfo
  const date=route.params.date.toISOString().split('T')[0]
  console.log(addChallengeInfo)
  
  console.log(date, "---->line8")
  return (
    <SafeAreaView>
      <Text>AddJournal</Text>
      <Text>{addChallengeInfo.title}</Text>
      <Text>{addChallengeInfo.times}</Text>
      <Text>{date}</Text>
    </SafeAreaView>
  )
}

export default AddJournal

const styles = StyleSheet.create({})