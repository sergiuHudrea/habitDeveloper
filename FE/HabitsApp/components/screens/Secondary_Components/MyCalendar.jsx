import moment from "moment";
import { View, Text,StyleSheet } from "react-native"
// import { Calendar } from "react-native-calendars"
import CalendarStrip from 'react-native-calendar-strip'
//get dates of completed challenges as datesArr
// const datesArr = [{'2023-01-22', challengeName}, ... ]
// push on markedDatesArr each one of the datesArr items with different colors

export const MyCalendar =({selectedDay, setSelectedDay})=>{
    const markedDatesArray = [
        {
          date: moment('2023-01-22', 'YYYY-MM-DD'),
          dots: [{color: "green"}]
        },
        {
          date: moment('2023-01-20', 'YYYY-MM-DD'),
          dots: [{color: "red"},{color: "blue"},{color: 'yellow'},{color: 'orange'}]
        },
      ];
    // console.log(selectedDay, "selectedday")

    return (
        <View>
            <CalendarStrip
            selectedDate={selectedDay}
            onDateSelected={(date) => setSelectedDay(date)}
            markedDates={markedDatesArray}
            style={{height:110, paddingTop: 20, paddingBottom: 10
            }}
            iconContainer={{flex: 0.02}}
            calendarColor={"#8eb4d28d"}
            scrollable={true}
            scrollerPaging={true}
            calendarAnimation={{type: 'sequence', duration: 10}}
            daySelectionAnimation={{type: 'background', duration: 300, borderWidth: 2, borderHighlightColor:"#78ACB1", highlightColor:"#78ACB1"}}
            />
        </View>
    )
}

const styles = StyleSheet.create({})