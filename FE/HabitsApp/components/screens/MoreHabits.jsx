import {StyleSheet, Text, FlatList, Image, View, TouchableOpacity, StatusBar,} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../apis'
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../Loader';


const MoreHabits = ({navigation,route}) => {

const [challenges, setChallenges]=useState()
const [isLoading, setIsLoading]=useState(true)
const userInfo = route.params


useEffect(()=>{ 
getUserData(userInfo).then((data)=>{ 
    const challengesInfo =Object.keys(data.challenges).map(key=>data.challenges[key])
    setChallenges(challengesInfo)
    setIsLoading(false)
   
  })
},[])

const HabitCard = ({title,description,img_url}) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={()=>navigation.navigate('Habit Detail', {title:title, description:description, img_url:img_url})}>
        <View style={{borderColor:'black',borderWidth:4,borderRadius:90,height:180,width:180,justifyContent:'center',alignItems:'center' }}>
          <Image style={styles.image} source={{uri:img_url}}/> 
        </View>
    
   
    </TouchableOpacity> 
    <Text style={styles.title}>{title}</Text> 
   
  </View>
 
  

);


return isLoading ? (
   <Loader />
):
( 
  <SafeAreaView>
  <FlatList showsVerticalScrollIndicator={false} numColumns={2}     data={challenges}
  renderItem={({item}) =>  
  <View style={styles.container} >
  <HabitCard title={item.title} img_url={item.img_url} description={item.description} key={item.date}/></View>
}/>
 </SafeAreaView>
   
   
  )
};

export default MoreHabits

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F7F6F8',
  },
  item: {
    backgroundColor: '#F7F6F8',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin:'1%',
    color:'red',
    marginHorizontal:1,
    marginVertical:7,
    padding:7,
  },
title:{
  textAlign:'center',
  margin:8,
  fontSize:14,
  fontWeight:'400',
  color:'black',
},
image:{
height:140,
width: 140,
},
header: {
  flexDirection: 'row',
  padding: 20,
  justifyContent: 'space-between',
},
})







