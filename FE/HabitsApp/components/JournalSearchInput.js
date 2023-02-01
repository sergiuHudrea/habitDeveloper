import { StyleSheet, Text, View } from 'react-native'
import Ionic from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useState,useEffect } from 'react';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { deleteJournalEntry, filterJournal, getJournalByUser } from '../apis'
import Loader from './Loader'

const JournalSearchInput = ({userInfo,input,setInput,selected}) => {
  console.log(userInfo.isPosted)
    const [userJournal, setUserJournal]=useState()
    const [isLoading, setIsLoading]=useState(true)
    const [selectedChallenge, setSelectedChallenge] = useState(undefined)

    
    
   

    useEffect(()=>{
      setSelectedChallenge(`${selected}`)
      console.log(selected,"<<<selected")
      if(selectedChallenge === undefined){
        console.log(selectedChallenge,"<<selectedChall")
        console.log(typeof(selectedChallenge),"<<selectedChall")
        console.log("<<<i got here")
         getJournalByUser(userInfo.email).then((data)=>{
        setUserJournal(data) 
        setIsLoading(false)
    })
      }else{
        console.log("<<<i got here2")
        filterJournal(userInfo.email,selected)
        .then((data) =>{
          console.log(data, ">>> data in else")
          setUserJournal(data) 
          setIsLoading(false)
        })
      }
     
      },[selected])

      
     

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