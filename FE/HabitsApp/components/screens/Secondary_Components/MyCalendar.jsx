import { View, Text,StyleSheet } from "react-native"
import { Calendar } from "react-native-calendars"

export const MyCalendar =({selectedDay, setSelectedDay})=>{
    const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key: 'workout', color: 'orange'};
    return (
        <View>
        <Calendar
        markingType='multi-dot'
        enableSwipeMonths={true}
            onDayPress={(day)=>{
                setSelectedDay(day)
                console.log(day)
            }}
            markedDates={{
                '2023-01-25': {dots: [vacation, massage, workout]},
                '2023-01-26': {dots: [vacation, massage, workout]},
                '2023-01-27': {dots: [vacation, massage, workout]},
                [selectedDay.dateString]: {selected: true, selectedColor: 'lightblue'},
            }}
        />
        </View>
    )
}

const styles = StyleSheet.create({})