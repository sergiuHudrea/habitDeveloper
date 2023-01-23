import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from 'react-native'
import React, { useEffect, useState } from 'react'

const LogIn = () => {
    const [email,setEmail]=useState('')
    const [password, setPassword]=useState('')


const handleLogIn=()=>{
   
}


  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
    <Image source={require('../logo/logo.png')}
    style={{width:200, height:190,marginTop:-40,marginBottom:30}}/>
        <View style={styles.inputContainer}>
            <TextInput
            placeholder='Email'
            value={email}
            onChangeText={text=> setEmail(text)}
            style={styles.input}
           />
            <TextInput
            placeholder='Password'
            value={password}
            onChangeText={text=> setPassword(text)}
            style={styles.input}
            secureTextEntry
           />
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleLogIn}
        style={styles.button}
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{}}
        style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LogIn

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',

    },
    inputContainer:{
        width:'80%',

    },
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
    },
    button:{
        backgroundColor:'#006633',
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
        borderColor:'#006633',
        borderWidth:2,
},
    buttonText:{
        color:'white',
        fontWeight:'500',
        fontSize: 16,

    },
    buttonOutlineText:{
        color:'#4DA768',
        fontWeight:'500',
        fontSize: 16,
    },
    
})