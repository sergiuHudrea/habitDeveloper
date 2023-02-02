import { View, Text, StyleSheet } from "react-native"
import CalendarStrip from 'react-native-calendar-strip'

export const MyCalendar =({selectedDay, setSelectedDay})=>{

    return (
        <View>
            <CalendarStrip
            maxDate={new Date()}
            selectedDate={selectedDay}
            onDateSelected={(date) => setSelectedDay(date)}
            style={{height:110, paddingTop: 20, paddingBottom: 10, paddingLeft: 15, paddingRight: 15
            }}
            iconContainer={{flex: 0.02}}
            calendarColor={"white"}
            scrollable={true}
            scrollerPaging={false}
            calendarAnimation={{type: 'sequence', duration: 10}}
            daySelectionAnimation={{type: 'background', duration: 300, borderWidth: 2, borderHighlightColor:"#78ACB1", highlightColor:"#55BEDF"}}
            />
        </View>
    )
}

const styles = StyleSheet.create({})