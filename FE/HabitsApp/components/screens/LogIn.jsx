import { KeyboardAvoidingView, StyleSheet, Text,TouchableOpacity, View, Keyboard} from 'react-native'

import React, { useEffect, useState } from 'react'
import Inputs from '../inputs';
import { getUserData } from '../../apis';
import Loader from '../Loader';
import { Header } from 'react-native';




const LogIn = ({navigation}) => {
const [inputs,setInputs]=useState({email:'', password:''})
const [isError,setIsError]=useState({})
const [invalidErr,setInvalidErr]=useState({})
const [isLoading,setIsLoading]=useState(false)
const [isValid,setIsValid]=useState(false)
const [userInfo,setUserInfo]=useState({})

useEffect(()=>{
    getUserData({email:inputs.email, password: inputs.password}).then((userData)=>{
        if(userData && (inputs.email===userData.email && inputs.password===userData.password)){
            setUserInfo(userData)
            setIsLoading(false)
            handleLogIn()
            } else {
                setIsValid(false)
                setIsLoading(false)
            }
        })
    },[isValid])




const validate=()=>{
Keyboard.dismiss();
let valid=true;
if(!inputs.email){
handleError('Please input email','email');
valid=false;
}else if(!inputs.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
    handleError('Please input a valid email','email');
    valid=false;
}
if(!inputs.password){
    handleError('Please input password','password');
    valid=false;
}else if(inputs.password.length<8){
    
    handleError('Minimum password length of 8 characters ','password');
    valid=false;

}
 
 
if(valid){
   setIsValid(true) 
   setIsLoading(true)
}
 
}

    
    



    
const handleOnChange =(text,input)=>{
setInputs(prevState=>({...prevState,[input]:text}));
}
const handleError =(errorMsg,input)=>{
setIsError((prevState)=>({...prevState,[input]:errorMsg}));
}
const handleLogIn=()=>{
    console.log('FE is working')
   navigation.navigate('MainContainer', {email: inputs.email, password: inputs.password})
}



  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
        <Loader visible={isLoading}/>
        <Text style={styles.header}>Habit Developer</Text>
        <View>
            <Inputs 
            onChangeText={text=>handleOnChange(text,'email')}
            placeholder='Enter your email address' 
            error={isError.email}
            onFocus={()=>{
                handleError(null, 'email');
            }}
            iconName={'mail-open-outline'}/>
            <Inputs 
            onChangeText={text=>handleOnChange(text,'password')}
            placeholder='Enter your password'
            error={isError.password}
            onFocus={()=>{
                handleError(null, 'password')
            }}
            iconName={'lock-closed-outline'}
            password/>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={validate}
        style={styles.button}
        >
            <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
        
         onPress={()=>navigation.navigate('Register')}
        >
            <Text style={styles.buttonOutlineText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
 
};
export default LogIn

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#345772',
    },
    input:{
        height:45,
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
    },
    button:{
        backgroundColor:'#55BEDF',
        width:'100%',
        padding:15,
        alignItems:'center',
        borderRadius:10,
    },
    buttonContainer:{
        width:'60%',
        justifyContent: 'center',
        alignItems:'center',
        marginTop:40,
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#55BEDF',
        borderWidth:2,
},
    buttonText:{
        color:'#F7F6F8',
        fontWeight:'bold',
        fontSize: 16,

    },
    buttonOutlineText:{
        color:'#F7F6F8',
        fontWeight:'500',
        fontSize: 13,
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    header:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:-40,
        marginBottom: 100,
        color:'#F7F6F8',
        fontFamily:'Georgia',
        
    }
    
})