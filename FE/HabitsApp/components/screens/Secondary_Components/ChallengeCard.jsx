import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { patchUserChallenges } from "../../../apis";
import { RecursiveBadgeCalculator } from "../../RecursiveBadgeCalculator";
import { streakCalculator } from "../../streakCalculator";

export const ChallengeCard =({setRefreshing, chal, selectedDay, navigation, userInfo})=>{
    const chalCode = Object.keys(chal)[0] // challenges key
    const [fillColor, setFillColour] = useState("white")


    useEffect(()=>{
        if(chal[chalCode].dates.includes(selectedDay.toISOString().split('T')[0])) {setFillColour("#cbd3d3af")}
    },[])

    const [disabledCheckBox, setDisabledCheckBox] = useState(false);

    return (
        ((chal[Object.keys(chal)[0]].times) !== null && //if times not null
        <View style={styles.container} backgroundColor={fillColor}>
            <Text style={styles.text}>{chal[Object.keys(chal)[0]].title}</Text>
            <BouncyCheckbox text={"completed!"} bounceEffectIn={0.3} bouncinessIn={30} fillColor={"#55BEDF"} disabled={disabledCheckBox}
                isChecked={chal[chalCode].dates.includes(selectedDay.toISOString().split('T')[0])}
                onPress={(isChecked )=>{
                    
                    if (isChecked && !chal[chalCode].dates.includes(selectedDay.toISOString().split('T')[0])) {
                        setFillColour("#cbd3d3af")
                        setDisabledCheckBox(true)
                        // setRefreshing(true);
                        // setTimeout(() => {
                        // setRefreshing(false);}, 1000);
                        const chalCodeStrTimes = 'challenges.'+ chalCode.toString() + ".times"
                        const chalCodeStrDates = 'challenges.'+ chalCode.toString() + ".dates"
                        const chalCodeStrBadges = 'challenges.'+ chalCode.toString() + ".badges"
                        const chalCodeStrStreaks = 'challenges.'+ chalCode.toString() + ".streak"
                        patchUserChallenges(userInfo.email,chalCodeStrTimes, chal[chalCode].times+1)
                        chal[chalCode].dates.push(selectedDay.toISOString().split('T')[0])
                        patchUserChallenges(userInfo.email,chalCodeStrDates, chal[chalCode].dates)

                        streakCalculator(selectedDay, chal[chalCode].dates, userInfo.email, chalCodeStrStreaks, chal[chalCode].streak)
                        RecursiveBadgeCalculator(chal[chalCode].times, userInfo.email, chalCodeStrBadges, chal[chalCode].badges)
                    }
                    
                }}
                
                />
                
                
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {navigation.navigate("Add Journal",{addChallengeInfo:chal[chalCode], date:selectedDay, email:userInfo.email, challengeName:chalCode})}}
                style={styles.button}
                ><Text  style={styles.buttonText}>Write to journal</Text>
            </TouchableOpacity>
        </View>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        textAlign: "center",
        marginRight: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#55BEDF",
        margin: 0,
        backgroundColor: "#F7F6F8",
        width: 150,
        height: 200,
        padding: 10,
        shadowOffset: {width:0, height:5},
        shadowOpacity: 0.2,
    },
    text: {
        height: 90,
        color: 'black',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10
    },
    button: {
        marginTop: 10,
        backgroundColor:'#345772',
        width:'100%',
        padding:5,
        alignItems:'center',
        borderRadius:10,
    },
    buttonText: {
        color: 'white'
    }
})

