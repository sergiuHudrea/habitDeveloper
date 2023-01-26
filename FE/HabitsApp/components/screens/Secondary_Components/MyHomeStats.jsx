import { View, Text, StyleSheet, Image, ScrollView} from "react-native"
import ProgressCircle from 'react-native-progress/Circle'
// import { Image } from "react-native-svg"

export const MyHomeStats =({ongoingChallengesArr})=>{
    console.log(ongoingChallengesArr)
    return (
        <ScrollView>
            <Text style={styles.title}>Ongoing challenges:</Text>{
            ongoingChallengesArr.map((chal)=>{
                console.log(chal[Object.keys(chal)[0]].times)
                const times = chal[Object.keys(chal)[0]].times % 42
                let colourBadge = ""
                let goalTimesForNextbadge =0
                if (times<7) {
                    colourBadge = "#CD7F32"
                    goalTimesForNextbadge = 7
                } else if (times<21) {
                    colourBadge = "#C0C0C0"
                    goalTimesForNextbadge = 21
                } else if (times<42) {
                    colourBadge = "#dac206"
                    goalTimesForNextbadge = 42
                }



                return (<View style={styles.container}>
                        <View style={styles.smallContainer}>
                            <View style={styles.evenSmallerContainer}>
                                <Text>{chal[Object.keys(chal)[0]].title}</Text>
                                <View flexDirection={"row"} alignItems={"center"} marginTop={5}><Text>{`Streak: ${chal[Object.keys(chal)[0]].streak}`}</Text><Image source={require("../../../assets/flame-icon.png")} style={{height:30, width:30}}/></View>
                                <Text>{`Times completed: ${chal[Object.keys(chal)[0]].times}`}</Text>
                            </View>
                            <ProgressCircle color={colourBadge} progress={times/goalTimesForNextbadge} size={50}  thickness={5} borderWidth={2} showsText={true} borderColor={"#78ACB1"} textStyle={{fontSize:13, fontWeight:"bold", color:"#78ACB1"}} marginLeft={5}/>
                        </View>
                            {/* color={"#dac206"} color={"#b9f2ff"}color={"#C0C0C0"}color={"#CD7F32"}color:"#78ACB1"}} */}
                    </View>)
            })
        }</ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {justifyContent: "center", alignItems:'center',},
    smallContainer: {flexDirection: "row", alignItems: "center", margin: 15, borderWidth:5, borderRadius:20,borderColor:"#71979A", padding:10}, 
    title: {alignSelf: "center",marginBottom: 5, fontSize: 18, marginTop:20},
    evenSmallerContainer: {flexDirection: "column", alignItems: "center", width:250,}
  })