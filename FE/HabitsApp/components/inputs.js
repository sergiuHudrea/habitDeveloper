import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';





const Inputs = ({iconName,error,password,onFocus=()=>{},...props}) => {
    const [isFocused, setIsFocused]=useState(false)
    const [hidePassword, setHidePassword]= useState(password)


  return (
    <View style={{marginBottom:10}}>
      <View style={[style.inputContainer,{borderColor: error 
      ? '#fd5a5a'
      : isFocused 
      ? '#55BEDF'
      : '#345772'
     },
    ]}>
        <Ionicons style={{fontSize:22, color:'#55BEDF', marginRight:10}}name={iconName}/>
        <TextInput autoCorrect={false} autoCapitalize={false} keyboardType={'email-address'}
        secureTextEntry={hidePassword} 
        onFocus={()=>{onFocus();
            setIsFocused(true);
        }} 
        onBlur={()=>{
            setIsFocused(false);
        }}
        style={{flex:1}}
        {...props}
       />
       {password && (
        <Ionicons onPress={()=>setHidePassword(!hidePassword)} 
       style={{fontSize:22, color:'#55BEDF', }} 
       name={hidePassword ? 'eye-off':'eye'}/>
       )}
      </View>
      {error && (
      <Text style={{color:'#fd5a5a', fontSize:16, fontWeight:'600' ,marginTop:7}}>{error}
      </Text>
      )}
      
    </View>
  )
}

export default Inputs


const style = StyleSheet.create({
    inputContainer:{
        height:50,
        backgroundColor:'#F7F6F8',
        flexDirection:'row',
        paddingHorizontal:15,
        borderWidth:2,
        alignItems:'center',
        width:350,
        borderRadius:10,

    },
})