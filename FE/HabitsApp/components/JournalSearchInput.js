import { StyleSheet, Text, View } from 'react-native'
import Ionic from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useState,useEffect } from 'react';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { deleteJournalEntry, getJournalByUser } from '../apis'
import Loader from './Loader'


const JournalSearchInput = ({userInfo,input,setInput}) => {
    const [userJournal, setUserJournal]=useState()
    const [isLoading, setIsLoading]=useState(true)
    

    useEffect(()=>{
        getJournalByUser(userInfo.email).then((data)=>{
          setUserJournal(data) 
          setIsLoading(false)
        })
      },[userJournal])



     


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
              </View>
          )
        }
        if(journal.journalEntry.toLowerCase().includes(input.toLowerCase())){
            return(
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
        height:200,
        borderBottomWidth:0.2,
        borderTopWidth:0.2,
        borderColor:'#B2BDB5',
       backgroundColor:'white',
       marginVertical:10,
       shadowOffset:{width:0,height:10},
     shadowOpacity:0.1,
     shadowColor:'#345772',
      },
      date:{
        marginHorizontal:10,
        marginVertical:12,
       marginTop:-20
      },
      trashIcon:{
        margin:5,
        padding:3,
        alignSelf: 'flex-end',
      }
})