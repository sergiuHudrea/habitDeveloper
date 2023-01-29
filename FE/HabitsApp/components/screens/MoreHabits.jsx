import {StyleSheet, Text, FlatList, Image, View, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../apis'
import Ionic from 'react-native-vector-icons/Ionicons';
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
  
    <SafeAreaView style={styles.item}>
      <TouchableOpacity onPress={()=>navigation.navigate('Habit Detail', {title:title, description:description, img_url:img_url})}>
        <View>
          <Image style={{  borderColor:'black',borderWidth:4,height:180,width:180, alignSelf:'center',borderRadius:90, }} source={{uri:img_url}}/> 
        </View>
    
   
    </TouchableOpacity> 
    <Text style={styles.title}>{title}</Text> 
   
  </SafeAreaView>
 
  

);


return isLoading ? (
   <Loader />
):
( 
    <FlatList showsVerticalScrollIndicator={false} numColumns={2} style={styles.container}     data={challenges}
  renderItem={({item}) => <HabitCard title={item.title} img_url={item.img_url} description={item.description} key={item.date}/>
}/>
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
    marginVertical: 5,
    margin:'1%',
    color:'red',
    marginHorizontal:10,
    marginVertical:10,
    padding:7,
  },
title:{
  textAlign:'center',
  margin:8,
  fontSize:14,
  fontWeight:'400',
  color:'black',
}
})







