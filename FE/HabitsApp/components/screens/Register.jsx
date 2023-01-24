import { Keyboard, ScrollView, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Inputs from '../inputs';
import Loader from '../Loader';



const Register = ({navigation}) => {
  const [inputs, setInputs] = React.useState({username: '',email: '',password: '',conpassword: ''});
  const [isError,setIsError]=useState({})
  const [isLoading,setIsLoading]=useState(false)


  const validate=()=>{

    Keyboard.dismiss();
    let valid=true;
    if(!inputs.username){
      handleError('Please input a username','username');
      valid=false;
    }
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
    if(!inputs.conpassword){
      handleError('Please confirm your password','conpassword');
      valid=false;
  }else if(inputs.conpassword !== inputs.password){
    handleError('Your password does not match, try agin','conpassword');
    valid=false;
}




    if(valid){
    
    }
     
    }


    const handleOnChange =(text,input)=>{
      setInputs(prevState=>({...prevState,[input]:text}));
      }
      const handleError =(errorMsg,input)=>{
      setIsError((prevState)=>({...prevState,[input]:errorMsg}));
      }
      const handleRegister=()=>{
        
      }


  return (
    <SafeAreaView style={{backgroundColor:'#F7F6F8', flex:1}}>
      <KeyboardAvoidingView behavior='padding' style={{paddingTop: 50, paddingHorizontal: 20}}> 
      <Loader visible={isLoading}/>
        <Text style={{color:'#345772', fontSize: 40, fontWeight: 'bold'}}>Register</Text>
      <Text style={{color: '#78ACB1', fontSize: 18, marginVertical: 10,marginBottom:40}}>
      Enter Your Details to Register
      </Text>
      <View >
         <Inputs
            onChangeText={text => handleOnChange(text, 'username')}
            onFocus={() => handleError(null, 'phone')}
            iconName="person-circle-outline"
            label="Username"
            placeholder="Choose a username"
            error={isError.username}
          />
          <Inputs
            onChangeText={text => handleOnChange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName={'mail-open-outline'}
            label="Email"
            placeholder="Enter your email address"
            error={isError.email}
          />
         
          <Inputs
            onChangeText={text => handleOnChange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-closed-outline"
            label="Password"
            placeholder="Enter your password"
            error={isError.password}
            password
          />
          <Inputs
            onChangeText={text => handleOnChange(text, 'conpassword')}
            onFocus={() => handleError(null, 'conpassword')}
            iconName="lock-open-outline"
            label="Confirm password"
            placeholder="Confirm your password"
            error={isError.conpassword}
            password
          /> 
          </View>
           <TouchableOpacity
        activeOpacity={0.7}
        onPress={validate}
        style={styles.button}
        >
            <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('Log In')}
            style={{
              color:'#345772',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
              textDecorationLine: 'underline',
            }}>
            Already have an account? Login
          </Text>
       
     </KeyboardAvoidingView>
     
    </SafeAreaView>
    
  )
}

export default Register

const styles = StyleSheet.create({
  button:{
    backgroundColor:'#55BEDF',
    height: 55,
    width:'100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
},
buttonText:{
  color:'#F7F6F8',
  fontWeight:'bold',
  fontSize: 16,

}
})