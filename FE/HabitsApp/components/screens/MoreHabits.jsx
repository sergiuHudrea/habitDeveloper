import {StyleSheet, Text, FlatList, Image, View, TouchableOpacity,SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../apis'
import Ionic from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader';


const MoreHabits = ({navigation,route}) => {
const [challenges, setChallenges]=useState()
const [isLoading, setIsLoading]=useState(true)
const userInfo = route.params
const[wholeObj, setWholeObj] = useState({})

useEffect(()=>{ 
getUserData(userInfo).then((data)=>{ 
    setWholeObj(data.challenges)
    const challengesInfo =Object.keys(data.challenges).map(key=>data.challenges[key])
    setChallenges(challengesInfo)
    setIsLoading(false)
  })
},[])



const HabitCard = ({title,description,img_url, wholeObj, email}) => (
  <View style={styles.item}>
      <TouchableOpacity onPress={()=>navigation.navigate('Habit Detail', {title:title, description:description, img_url:img_url, wholeObj: wholeObj, email: email})}>
        <View style={{backgroundColor:'white', borderWidth:20, borderColor:'#55BEDF',borderRadius:90,height:180,width:180,justifyContent:'center',alignItems:'center',shadowOffset: {width:0, height:5},
              shadowOpacity: 0.2, }}>
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
  <SafeAreaView style={{flex:1}}>
    <FlatList showsVerticalScrollIndicator={false} numColumns={2} data={challenges}
  renderItem={({item}) =><View style={styles.container} >
   <HabitCard title={item.title} img_url={item.img_url} description={item.description} key={item.date} wholeObj={wholeObj} email = {userInfo.email}/></View>
}/></SafeAreaView>
  )
};

export default MoreHabits

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 5,
    margin:'1%',
    color:'red',
    borderRadius: 50,
    marginHorizontal:10,
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
}
})







