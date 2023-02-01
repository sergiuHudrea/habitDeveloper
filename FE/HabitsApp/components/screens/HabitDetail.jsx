import { Image,StyleSheet, Text, View,SafeAreaView,StatusBar,ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import { patchUserChallenges } from '../../apis';


const HabitDetail = ({navigation,route}) => {
  const challenges=route.params
  let chalName = "ChallengeName"
  for (const elem in challenges.wholeObj) {
    if (challenges.title === challenges.wholeObj[elem].title) {
      chalName = elem
    }
  }
  console.log('challenges.'+chalName+ ".times", "EKEN")
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <StatusBar backgroundColor={'white'} />
      <View style={{height: 400,backgroundColor:'#55BEDF'}}>
        
        <ImageBackground
          source={challenges.img_url}
          style={{
            height: 280,
            top: 10,
          }}>
          
          <View style={style.header}>
            <Ionic
              name="arrow-back"
              size={28}
              color={'black'}
              onPress={navigation.goBack}
            />
          </View>
          <View style={{alignItems:'center'}}>
             <Image source={{uri:challenges.img_url}} style={{height:200,width:200,justifyContent:'center'}}/>
          </View>
         
        </ImageBackground>

        <View style={style.detailsContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', alignItems:'center'}}>{challenges.title}
            </Text>
          </View>
        </View>
      </View>
<View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
  <Text style={{textAlign:'center',padding:20,margin:1,fontSize:15,color:'#839AAD'}}>{challenges.description}</Text>
</View>
      <TouchableOpacity activeOpacity={0.7} style={style.button} onPress={()=>patchUserChallenges(challenges.email ,'challenges.'+chalName+ ".times", 0).then(() => navigation.navigate('Home'))}>
        <Text style={{color: 'white', fontWeight: 'bold',fontSize:18}}>ADD <Ionic size={20} name='add' /></Text>
      </TouchableOpacity>
     
    </SafeAreaView>
  );
};

export default HabitDetail

const style = StyleSheet.create({
  detailsContainer: {
    height: 120,
    backgroundColor: '#F7F6F8',
    marginHorizontal: 20,
    flex: 1,
    bottom: -60,
    borderRadius: 18,
    elevation: 10,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {
      height: 10,
      width: 2,
    },
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  button:{
    backgroundColor: '#345772',
    height:70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:40,
    marginHorizontal:30,
    marginVertical:10
  }
})