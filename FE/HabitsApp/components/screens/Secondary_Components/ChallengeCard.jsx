import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { patchUserChallenges } from "../../../apis";
import { RecursiveBadgeCalculator } from "../../RecursiveBadgeCalculator";

export const ChallengeCard =({chal, selectedDay, navigation, userInfo})=>{
    const chalCode = Object.keys(chal)[0] // challenges key
    // console.log(selectedDay.toISOString().split('T')[0], 'selected day card')
    const [fillColor, setFillColour] = useState("white")


    useEffect(()=>{
        if(chal[chalCode].dates.includes(selectedDay.toISOString().split('T')[0])) {setFillColour("#cbd3d3af")}

    },[])

    return (
        ( Boolean(chal[Object.keys(chal)[0]].times) && //if times not null
        <View style={styles.container} backgroundColor={fillColor}>
            <Text style={styles.text}>{chal[Object.keys(chal)[0]].title}</Text>
            <BouncyCheckbox text={"completed!"} bounceEffectIn={0.3} fillColor={"#55BEDF"}
                isChecked={chal[chalCode].dates.includes(selectedDay.toISOString().split('T')[0])}
                onPress={(isChecked )=>{
                    if(isChecked){setFillColour("#cbd3d3af")}
                    if (isChecked && !chal[chalCode].dates.includes(selectedDay.toISOString().split('T')[0])) {
                        const chalCodeStrTimes = 'challenges.'+ chalCode.toString() + ".times"
                        const chalCodeStrDates = 'challenges.'+ chalCode.toString() + ".dates"
                        const chalCodeStrBadges = 'challenges.'+ chalCode.toString() + ".badges"
                        patchUserChallenges(userInfo.email,chalCodeStrTimes, chal[chalCode].times+1)
                        chal[chalCode].dates.push(selectedDay.toISOString().split('T')[0])
                        patchUserChallenges(userInfo.email,chalCodeStrDates, chal[chalCode].dates)
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
        marginRight: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#18BB9C",
        margin: 0,
        backgroundColor: "#F7F6F8",
        width: 150,
        height: 200,
        padding: 10,
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
        backgroundColor:'#78ACB1',
        width:'100%',
        padding:5,
        alignItems:'center',
        borderRadius:10,
    },
    buttonText: {
        color: 'white'
    }
})

