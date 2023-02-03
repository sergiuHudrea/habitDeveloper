import { StyleSheet, Text, SafeAreaView, TextInput, View, TouchableOpacity, KeyboardAvoidingView,Image, Alert,StatusBar } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { patchJournalEntry } from '../apis'
import Ionic from 'react-native-vector-icons/Ionicons';

const AddJournal = ({navigation, route}) => {
  const addChallengeInfo=route.params.addChallengeInfo
  const challengeName = route.params.challengeName
  const date=route.params.date
  const email = route.params.email
  
  const [journalInput, setJournalInput] = useState("");
  
  

  const patchJournal = () => {
    if(journalInput !== ''){
    patchJournalEntry(challengeName,addChallengeInfo.title,addChallengeInfo.times, journalInput, date, email)
      .then(() => {
        navigation.navigate("Journal")
      })
    }else{
      Alert.alert('Oops!', 'This field cannot be empty', [
        {text: 'Try Again', onPress: () => {}},
          ]);
    }
    
  }


  return (
    
    <SafeAreaView style={{backgroundColor:'white', flex:1}}>
      <View>
          <View style={styles.header}>
            <Ionic
              name="arrow-back"
              size={28}
              color={'black'}
              onPress={navigation.goBack}
            />
            </View>
          </View>
      <KeyboardAvoidingView>
      <Image style={{height:220, width:220,alignSelf:'center'}} source={{uri:'https://www.launch-marketing.com/wp-content/uploads/2019/10/GettyImages-946716862.jpg'}}/>
      <View style={styles.journalInput}>
      <TextInput keyboardAppearance='true'  maxLength={200} scrollEnabled={true} multiline={true} value={journalInput} onChangeText={(text)=> setJournalInput(text)} placeholder="How do you feel?"/>
      </View>
      <TouchableOpacity style={styles.button} onPress={patchJournal}><Text style={styles.buttonText} >Save</Text></TouchableOpacity>
      </KeyboardAvoidingView>
      
    </SafeAreaView>
   
      
    
    
  )
}

export default AddJournal

const styles = StyleSheet.create({
  journalInput:{
    backgroundColor:'#F7F6F8',
    height: 200,
    width: "80%",
    alignSelf:'center',
    borderTopWidth: 9,
    borderColor:'#55BEDF',
    marginVertical: 10,
    padding:10,
    borderRadius:10,
    shadowOffset:{width:0,height:4},
    shadowOpacity:0.4,
    shadowRadius:2,
    
  },
  button: {
    marginTop: 10,
    backgroundColor:'#55BEDF',
    width:'20%',
    padding:5,
    alignSelf:'center',
    
    borderRadius:10,
},
buttonText: {
  color: 'white',
  textAlign: 'center'
},
header: {
  flexDirection: 'row',
  padding: 20,
  justifyContent: 'space-between',
},
})


// refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}