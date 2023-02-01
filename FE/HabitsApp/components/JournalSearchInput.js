import { StyleSheet, Text, View } from 'react-native'
import Ionic from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useState,useEffect } from 'react';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { deleteJournalEntry, filterJournal, getJournalByUser } from '../apis'
import Loader from './Loader'

const JournalSearchInput = ({userInfo,input,setInput}) => {
    const [userJournal, setUserJournal]=useState()
    const [isLoading, setIsLoading]=useState(true)
    const [selectedChallenge, setSelectedChallenge] = useState("")

    
    const handleSort = (selectedChallenge) => {
      if (selectedChallenge!==undefined) {
        filterJournal(userInfo.email,selectedChallenge)
        .then((data) =>{
          console.log(data, ">>> data in else")
          setUserJournal(data) 
          console.log(userJournal, ">>>in else")
          setIsLoading(false)
        })
      } else {
          getJournalByUser(userInfo.email).then((data)=>{
            console.log(data, ">>> data in if")
            setUserJournal(data) 
            console.log(userJournal, ">>>in if")
            setIsLoading(false)
        })
      }
    }
    
   console.log(selectedChallenge, ">>>1")

    useEffect(()=>{
      setSelectedChallenge(userInfo.selectedChallenge)
      console.log(selectedChallenge,">>>before if")
      handleSort(selectedChallenge)
      // if (selectedChallenge===undefined) {
      //   getJournalByUser(userInfo.email).then((data)=>{
      //     console.log(data, ">>> data in if")
      //     setUserJournal(data) 
      //     console.log(userJournal, ">>>in if")
      //     setIsLoading(false)
      //   })
      // } else {
      //   filterJournal(userInfo.email,selectedChallenge)
      //   .then((data) =>{
      //     console.log(data, ">>> data in else")
      //     setUserJournal(data) 
      //     console.log(userJournal, ">>>in else")
      //     setIsLoading(false)
      //   })
      // }
      },[userInfo.selectedChallenge])

      console.log(selectedChallenge, ">>>2")
      
     

    return isLoading ? (
        <Loader />
      ):
      ( 
    <View style={styles.journalCardContainer}>
      {userJournal.map((journal,index)=>{
        if(input === ''){
          return (
              <View style={styles.journalCard} >
                <Ionic name='trash' style={styles.trashIcon} size={20} onPress={() =>{deleteJournalEntry(journal._id)}}/>
                  <Text style={styles.date}><SimpleDateTime dateSeparator="/"  showTime='0' meridians="1" format="DMY">{journal.date}</SimpleDateTime></Text>
                    <Text style={{marginHorizontal:10,fontSize:15}}>{journal.journalEntry}</Text>
                    <Text>{journal.challengeName}</Text>
                    <View>
                      
                    </View>
              </View>
          )
        }
        if(journal.journalEntry.toLowerCase().includes(input.toLowerCase())){
            return (
                <View style={styles.journalCard} >
                  <Ionic name='trash' style={styles.trashIcon} size={20} onPress={() =>{deleteJournalEntry(journal._id)}}/>
                     <Text style={styles.date}><SimpleDateTime dateSeparator="/"  showTime='0' meridians="1" format="DMY">{journal.date}</SimpleDateTime></Text>
                      <Text style={{marginHorizontal:10,fontSize:15}}>{journal.journalEntry}</Text>
                </View>
            )
        }
})}
    </View>
  )
}

export default JournalSearchInput

const styles = StyleSheet.create({
    journalCardContainer:{
        paddingHorizontal:20,
        marginTop:20
      },
      journalCard: {
        height:180,
        borderBottomWidth:0.2,
        borderTopWidth:0.2,
        marginVertical:10,
        borderRadius:10,
        borderColor:'#B2BDB5',
       backgroundColor:'white',
       shadowOffset:{
        width:0,
        height:4
       },shadowOpacity:0.15,

       
      },
      date:{
        marginHorizontal:10,
        marginVertical:10,
        alignSelf:'flex-start',
        marginTop:-20,
      },
      trashIcon:{
        alignSelf: 'flex-end',
        margin:5
      }
})