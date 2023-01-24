import { View, Text, StyleSheet, Image} from "react-native"
import ProgressCircle from 'react-native-progress/Circle'
// import { Image } from "react-native-svg"

export const MyHomeStats =()=>{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ongoing challenges:</Text>
            <View style={styles.smallContainer}>
                <View style={styles.evenSmallerContainer}>
                    <Text>Challenge sleep 4 hours straight</Text>
                    <View flexDirection={"row"} alignItems={"center"} marginTop={5}><Text>Streak: 16</Text><Image source={require("../../../assets/flame-icon.png")} style={{height:30, width:30}}/></View>
                </View>
                <ProgressCircle progress={0.9} size={50} color={"#b8a40f"} thickness={5} borderWidth={2} showsText={true} borderColor={"#b8a40f"} textStyle={{fontSize:13, fontWeight:"bold", color:"#78ACB1"}} marginLeft={5}/>
            </View>
            <View style={styles.smallContainer}>
            <View style={styles.evenSmallerContainer}>
                    <Text>Challenge sleep 4 hours straight</Text>
                    <View flexDirection={"row"} alignItems={"center"} marginTop={5}><Text>Streak: 6</Text><Image source={require("../../../assets/flame-icon.png")} style={{height:30, width:30}}/></View>
                </View>
                <ProgressCircle progress={0.7} size={50} color={"#C0C0C0"} thickness={5} borderWidth={2} showsText={true} textStyle={{fontSize:13, fontWeight:"bold", color:"#78ACB1"}} marginLeft={5}/>
            </View>
            <View style={styles.smallContainer}>
            <View style={styles.evenSmallerContainer}>
                    <Text>Challenge sleep 4 hours straight</Text>
                    <View flexDirection={"row"} alignItems={"center"} marginTop={5}><Text>Streak: 3</Text><Image source={require("../../../assets/flame-icon.png")} style={{height:30, width:30}}/></View>
                </View>
                <ProgressCircle progress={0.3} size={50} color={"#CD7F32"} thickness={5} borderWidth={2} showsText={true} textStyle={{fontSize:13, fontWeight:"bold", color:"#78ACB1"}} marginLeft={5}/>
            </View>
            <View style={styles.smallContainer}>
            <View style={styles.evenSmallerContainer}>
                    <Text>Challenge sleep 4 hours straight</Text>
                    <View flexDirection={"row"} alignItems={"center"} marginTop={5}><Text>Streak: 2</Text><Image source={require("../../../assets/flame-icon.png")} style={{height:30, width:30}}/></View>
                </View>
                <ProgressCircle progress={0.3} size={50} color={"#b9f2ff"} thickness={5} borderWidth={2} showsText={true} textStyle={{fontSize:13, fontWeight:"bold", color:"#78ACB1"}} marginLeft={5}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {justifyContent: "center", alignItems:'center'},
    smallContainer: {flexDirection: "row", alignItems: "center", margin: 5}, 
    title: {margin: 10, fontSize: 18, marginTop:20},
    evenSmallerContainer: {flexDirection: "column", alignItems: "center"}
  })