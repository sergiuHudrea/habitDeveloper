import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const ChallengeCard =({chal})=>{
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{chal}</Text>
            
            <Text style={styles.text}>Description..</Text>
            <BouncyCheckbox text={"completed!"} bounceEffectIn={0.3} fillColor={"#55BEDF"} onPress={(isChecked)=>{console.log(isChecked)}}/>
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