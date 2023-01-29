import {StyleSheet, Text, FlatList, Image, View,Dimensions, ScrollView,StatusBar, TextInput, TouchableOpacity} from 'react-native'
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import React, { useEffect, useState } from 'react'
import { getUserData,getJournalByUser } from '../../apis'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionic from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader';
const {width}=Dimensions.get('screen')

const Journal = ({navigation,route }) => {
const [userJournal, setUserJournal]=useState()
const [isLoading, setIsLoading]=useState(true)
const userInfo = route.params



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
  <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <StatusBar barStyle='dark-content' translucent={false} backgroundColor='black'/>
    <View style={styles.header}>
      <View>
        <Text style={{fontSize:36,fontWeight:'bold',marginVertical:20}}>Hello Sergiu!</Text>
        <Text style={{fontSize:16,fontWeight:'200'}}>How are you feeling today?</Text>
      </View>
      <Ionic/>
    </View>
    <ScrollView>
      <View 
      style={{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
      }}>
        <View style={styles.searchInput}>
          <Ionic name='search' size={23}/>
          <TextInput placeholder='Enter a keyword'/>
        </View>
        <View style={styles.sortBtn}>
          <Ionic style={{margin:12, justifyContent:'center'}}name='options' color={'white'} size={28}/>
        </View>
      </View>
      <View style={styles.journalCardContainer}>
      {userJournal.map((journal,index)=>(
        <View style={styles.journalCard} key={index}>
          <Text style={styles.date}><SimpleDateTime dateSeparator="/"  showTime='0' meridians="1" format="DMY">{journal.date}</SimpleDateTime></Text>
          <Text style={{marginHorizontal:10,fontSize:15}}>Even if you're not sure what a blog is, you've no doubt come across one at some point in time. Perhaps you've stumbled across a blog when you've searched "healthy dinner recipes". In fact, if you're reading this, guess what? You're on a blog. (Very meta, I know.)</Text>
        </View>
      ))}
    </View>
    
    </ScrollView>
    <View style={{flex:1}}>
      <TouchableOpacity style={styles.journalAddButton}><Ionic size={29} name='add' color={'white'} /></TouchableOpacity>
    </View>
  </SafeAreaView>
  )
};

export default Journal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F7F6F8'
  },
  journalCard: {
    height:180,
    borderBottomWidth:0.2,
    borderTopWidth:0.2,
    borderColor:'#B2BDB5',
   backgroundColor:'white'
   
  },
journalEntry:{
  textAlign:'center',
  fontStyle:'italic',
  margin:20,
  color:'black',
},
header:{
  paddingVertical:20,
  flexDirection:'row',
  justifyContent:'space-between',
  paddingHorizontal:20,
},
searchInput:{
  height:50,
  backgroundColor:'#F7F6F8',
  flex:1,
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal:20,
  borderRadius:10,
},
sortBtn:{
  backgroundColor:"#55BEDF",
  height:50,
  width:50,
  borderRadius:10,
  justifyContent:'center',
  alignContent:'center',
  marginLeft:10,

},
journalCardContainer:{
  paddingHorizontal:20,
  marginTop:20
},
journalAddButton:{
  backgroundColor:"#55BEDF",
  width:60,
  height:60,
  position:'absolute',
  bottom:20,
  right:40,
  borderRadius:50,
justifyContent:'center',
alignItems:'center',
},
date:{
  marginHorizontal:10,
  marginVertical:10,
}
})


















