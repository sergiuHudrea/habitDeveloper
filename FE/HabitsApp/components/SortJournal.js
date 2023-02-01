
import {Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import { getUserData } from "../apis";
import { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";



const SortJournal = ({navigation,route}) => {
    
    const [challengeList, setChallengeList] = useState([])

    useEffect(() => {
        getUserData(route.params.userInfo)
            .then((res) => {
                const challenges =[]
                Object.keys(res.challenges).map(challenge => {
                    challenges.push ({title:res.challenges[challenge].title, code: challenge})
                })
                setChallengeList(challenges) 
        })
    },[])

   
    
    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView >
                {challengeList.map((challenge) => (
                    <View>
                         <BouncyCheckbox text={challenge.title} onPress={() => {navigation.navigate('Journal', {selectedChallenge:challenge.code})}} style={style.challenges}></BouncyCheckbox>
                    </View>
                  
                  
                ))}


            </ScrollView>
        </SafeAreaView>
    )
}

export default SortJournal

const style=StyleSheet.create({
    challenges: {
        padding:10,
        marginVertical:5,
        marginHorizontal:30,
        justifyContent: 'left'
    }
})