import {StyleSheet, Text, FlatList, Image, View,Dimensions, ScrollView,StatusBar, TextInput, TouchableOpacity, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import JournalSearchInput from '../JournalSearchInput';
import AddJournal from '../AddJournal';
const {width}=Dimensions.get('screen')

const Journal = ({navigation,route,username }) => {
const [input,setInput]=useState('')
const userInfo = route.params
  
  
return ( 
  <SafeAreaView style={{backgroundColor:'white',flex:1}}>
    <StatusBar barStyle='dark-content' translucent={false} backgroundColor='black'/>
    <View style={styles.header}>
      <View>
        <Text style={{fontSize:36,fontWeight:'bold',marginVertical:20}}>Hello {userInfo.username}!</Text>
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
          <TextInput autoCapitalize={false} value={input} onChangeText={(text)=> setInput(text)} placeholder='Search'/>
        </View>
        <View style={styles.sortBtn}>
          <Ionic style={{margin:12, justifyContent:'center'}}name='options' color={'white'} size={28}/>
        </View>
      </View>
      <View>
        <JournalSearchInput userInfo={userInfo} input={input} setInput={setInput}/>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
};

export default Journal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F7F6F8'
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

})


















