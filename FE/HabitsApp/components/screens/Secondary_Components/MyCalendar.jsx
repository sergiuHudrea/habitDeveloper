import { View, Text,StyleSheet } from "react-native"
// import { Calendar } from "react-native-calendars"
import CalendarStrip from 'react-native-calendar-strip'

export const MyCalendar =({selectedDay, setSelectedDay})=>{
    return (
        <View>
            <CalendarStrip 
            style={{height:110, paddingTop: 20, paddingBottom: 10
            }}
            calendarColor={"#8eb4d28d"}
            scrollable={true}
            scrollerPaging={true}
            calendarAnimation={{type: 'sequence', duration: 10}}
            daySelectionAnimation={{type: 'background', duration: 200, borderWidth: 2, borderHighlightColor:"#78ACB1", highlightColor:"#78ACB1"}}
            />
        </View>
    )
}

const styles = StyleSheet.create({})