import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { patchUserChallenges } from "../../../apis";

export const ChallengeCard =({chal, selectedDay})=>{
    const chalNames = {Sl_1: "No Phone Before Bed",
    Sl_2: "Dim Lights 3h Before Bed",
    Sl_3: "Regular Sleep",
    Sl_4: "No Coffee 8h Before Bed",
    Sl_5: "No Large Meals Before Bed",
    Sl_6: "No Alcohol Before Bed",
    Sl_7: "No Nap After 3pm",
    Sl_8: "Natural Light 30 Mins",
    Sl_9: "Optimised Bedroom Environment",
    Sl_10: "Unwind Before Bed"}
    const chalCode = Object.keys(chal)[0] // challenges key

    //function that gets name from challenge code ex: Sl_10_UnwindBB-> "Unwind Before Bed"
    const getChalNameFromCode =(challCode)=>{
        let newCodesArr = challCode.split("_")
        newCodesArr = newCodesArr.slice(0,2)
        const codeStr = newCodesArr.join("_")
    return chalNames[codeStr]
    }

    // console.log(selectedDay.toISOString().split('T')[0], 'selected day card')

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{getChalNameFromCode(chalCode)}</Text>
            
            <Text style={styles.text}>Description..</Text>
            <BouncyCheckbox text={"completed!"} bounceEffectIn={0.3} fillColor={"#55BEDF"}
                isChecked={chal[chalCode].dates.includes(selectedDay.toISOString().split('T')[0])}
                onPress={(isChecked )=>{
                    if (isChecked && !chal[chalCode].dates.includes(selectedDay.toISOString().split('T')[0])) {
                        const chalCodeStr = 'challenges.'+ chalCode.toString() + ".times"
                        chal[chalCode].dates.push(selectedDay.toISOString().split('T')[0])
                        console.log(chalCodeStr, chal[chalCode].dates)
                        patchUserChallenges('Sergiu',chalCodeStr, chal[chalCode].times+1)
                        patchUserChallenges('Sergiu',chalCodeStr, chal[chalCode].dates)
                    }
                }}
                />
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => (console.log('goes to where the journal entry is.. tbd'))}
                style={styles.button}
                ><Text style={styles.buttonText}>Write to journal</Text>
            </TouchableOpacity>
        </View>
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
        color: 'black',
        fontSize: 18,
        marginBottom: 10,
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