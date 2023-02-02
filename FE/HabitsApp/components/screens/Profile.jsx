import { StyleSheet, Text, SafeAreaView,Image,View, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import { getUserData } from '../../apis'
import Ionic from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader';
import * as Notification from 'expo-notifications'
import * as Permission from 'expo-permissions'



const Profile = ({navigation,route}) => {
    const [profile,setProfile]=useState()
    const [isClicked, setIsClicked]=useState(false)
    const [isLoading, setIsLoading]=useState(true)
    const userInfo=route.params

useEffect(()=>{
    getUserData(userInfo).then((data)=>{
      setProfile(data) 
      setIsLoading(false)
    })
  },[])


const handleClick=()=>{
    if(isClicked===false){
        setIsClicked(true)
        handleNotification()
    }else{
        setIsClicked(false)
    }
}

useEffect(()=>{
    Permission.getAsync(Permission.NOTIFICATIONS).then(()=>{
      if(Response.status !=="granted"){
        return Permission.askAsync(Permission.NOTIFICATIONS);
      }
      return response
    }).then((response)=>{
      if(response.status !== "granted"){
        return;
      }
    })
  },[])
  
  
    const handleNotification=()=>{
    Notification.scheduleNotificationAsync({
    content:{
      title: "HABIT DEVELOPER",
      body: "We hope you are not taking a nap,it's past 3pm. Don't forget, it can affect your sleep at night",
      sound: "notification.wav",
    },
    trigger:{
      seconds: 8,
    },
  });
    }

  
  return isLoading ? (
    <Loader />
 ):
 ( 
    <View style={styles.container}>
    <View style={styles.image} ></View>
    <View style={styles.bottomContainer}>
<Image style={styles.profile} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzg5X2nUc4XR8sqGsKSuQeL9VUvWgkEDtzw&usqp=CAU'}}/>
<Text style={styles.username}>{profile.username}</Text>
<Text style={styles.email}>{profile.email}</Text>
 <TouchableOpacity onPress={()=>handleClick()}  style={[isClicked ? styles.activeReminderBtn:styles.reminderBtn]}>
    
<Text style={{fontSize:18,marginTop:10,color: 'white',textAlign:'center',justifyContent:'center'}}>Set Reminder  <Ionic name={isClicked ? 'notifications' :'notifications-off'} size={20}  /></Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('Log In')} activeOpacity={0.7} style={styles.button}>
        <Text style={{color: 'white',fontSize:18,fontWeight: 'bold',}}>Log Out <Ionic size={20} name='close'/></Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        flex:1,
        position:'absolute',
        width:'100%',
        height:'100%'
    },
bottomContainer:{
    marginTop:'52%',
    height:'60%',
    width:400,
    backgroundColor:'white',
    borderTopStartRadius:50,
    alignItems:'center',
    borderTopEndRadius:50, 
},
profile:{
    height:120,
    width:120,
    borderRadius:25,
    bottom:'10%',
},
username:{
    fontSize:30,
    fontWeight:'bold',
    marginBottom:10,
},
email:{
    fontSize:19,
    color:'grey',
    bottom:'2%',
},
reminderBtn:{
    backgroundColor: '#55BEDF',
    height:50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width:'80%',
    marginTop:50,
},
button:{
        backgroundColor: '#55BEDF',
        height:50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width:'80%',
        marginTop:30,
     
},
activeReminderBtn:{
    backgroundColor: '#55BEDF',
    height:50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width:'80%',
    marginTop:50,
},

})