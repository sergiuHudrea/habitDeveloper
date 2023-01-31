import { StyleSheet, Text, SafeAreaView, TextInput, View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { patchJournalEntry } from '../apis'

const AddJournal = ({navigation, route}) => {
  const addChallengeInfo=route.params.addChallengeInfo
  const challengeName = route.params.challengeName
  const date=route.params.date.toISOString()
  const email = route.params.email
  

  const [journalInput, setJournalInput] = useState("");
  const [isPosting,setIsPosting] = useState(false)
  const [isPosted,setIsPosted] = useState(false)

  
  const patchJournal = () => {
    setIsPosting(true)
    patchJournalEntry(challengeName,addChallengeInfo.title,addChallengeInfo.times, journalInput, date, email)
      .then(() => {
        setIsPosting(false)
        setIsPosted(true)
        handleSave()
      })
      setJournalInput("")
  }

  const handleSave = () => {
    navigation.navigate("Journal")
  }

  return (
    <SafeAreaView>
      <Text>{addChallengeInfo.title}</Text>
      <Text>{addChallengeInfo.times}</Text>
      <Text>{date.split('T')[0]}</Text>
      <View style={styles.journalInput}>
      <TextInput value={journalInput} onChangeText={(text)=> setJournalInput(text)} placeholder="How do you feel?"/>
      </View>
      <TouchableOpacity style={styles.button} onPress={patchJournal}><Text style={styles.buttonText} >Save</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

export default AddJournal

const styles = StyleSheet.create({
  journalInput:{
    backgroundColor:'#F7F6F8',
    borderWidth: 2,
    height: 100,
    width: "70%",
    alignSelf:'center',
    borderRadius:10,
    marginVertical: 10,
    padding:10
  },
  button: {
    marginTop: 10,
    backgroundColor:'#78ACB1',
    width:'20%',
    padding:5,
    alignSelf:'center',
    
    borderRadius:10,
},
buttonText: {
  color: 'white',
  textAlign: 'center'
}
})