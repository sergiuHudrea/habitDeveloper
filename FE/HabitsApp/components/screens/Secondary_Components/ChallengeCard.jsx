import { View, Text, StyleSheet} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
// import CircularProgress from 'react-native-circular-progress-indicator'

export const ChallengeCard =({chal})=>{
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{chal}</Text>
            
            <Text style={styles.text}>Description..</Text>
            {/* <CircularProgress
                value={76}
                valueSuffix={"days"}
            /> */}
            <BouncyCheckbox text={"Completed!"} fillColor={"#18BB9C"} onPress={(isChecked)=>{console.log(isChecked)}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})