import { patchUserChallenges } from "../apis"

export const streakCalculator = (selectedDay, datesArr, email, chalCodeStrStreaks, streak)=>{
    const today = selectedDay.toISOString().split('T')[0]
    let isOnStreak = false
    for (let i=datesArr.length-2; i>=0; i--){
        if((Date.parse(today) - Date.parse(datesArr[i])) === 86400000){
            isOnStreak = true
            streak = streak +1
            patchUserChallenges(email, chalCodeStrStreaks, streak)
        } 
    }
    if(!isOnStreak){
        patchUserChallenges(email, chalCodeStrStreaks, 0)
    }
}