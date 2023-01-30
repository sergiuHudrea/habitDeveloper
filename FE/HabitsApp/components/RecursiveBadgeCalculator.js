import { patchUserChallenges } from "../apis"

export const RecursiveBadgeCalculator =(times, email, chalCodeStrBadges, badges)=>{
    times + 1 === 7 ? patchUserChallenges(email, chalCodeStrBadges, [badges[0]+1, badges[1], badges[2]])
    : times + 1 === 21 ? patchUserChallenges(email, chalCodeStrBadges, [badges[0], badges[1]+1, badges[2]])
    : times + 1 === 42 ? patchUserChallenges(email, chalCodeStrBadges, [badges[0], badges[1], badges[2]+1])
    : times > 42 ? RecursiveBadgeCalculator(times-42, email, chalCodeStrBadges, badges)
    : null
} 