import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { getJournalByUser } from '../apis'
import Loader from './Loader'

const JournalSearchInput = ({userInfo,input,setInput}) => {
    const [userJournal, setUserJournal]=useState()
    const [isLoading, setIsLoading]=useState(true)
    

    useEffect(()=>{
        getJournalByUser(userInfo.email).then((data)=>{
          setUserJournal(data) 
          setIsLoading(false)
        })
      },[])
    



    return isLoading ? (
        <Loader />
      ):
      ( 
    <View style={styles.journalCardContainer}>
      {userJournal.map((journal,index)=>{
        if(journal.journalEntry === undefined){
            {journal.journalEntry}
return(
    <View>
        <Text>Hi</Text>
    </View>
)
        }
        if(input === ''){
return (
    <View style={styles.journalCard} >
         <Text style={styles.date}><SimpleDateTime dateSeparator="/"  showTime='0' meridians="1" format="DMY">{journal.date}</SimpleDateTime></Text>
          <Text style={{marginHorizontal:10,fontSize:15}}>{journal.journalEntry}</Text>
    </View>
)
        }
        if(journal.journalEntry.toLowerCase().includes(input.toLowerCase())){
            return (
                <View style={styles.journalCard} >
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
        borderColor:'#B2BDB5',
       backgroundColor:'white'
       
      },
      date:{
        marginHorizontal:10,
        marginVertical:10,
      }
})