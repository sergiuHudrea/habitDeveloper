// import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { sortJournalByChallenge,getUserData } from '../apis'
// import { useEffect,useState } from 'react'


// const SortJournal = ({navigation,route}) => {
// const [selcted,setSelected]= useState('')
// const [challenges, setChallenges]=useState()
// const [isLoading, setIsLoading]=useState(true)
// const userInfo = route.params

// useEffect(()=>{ 
//     getUserData(userInfo).then((data)=>{ 
//         const challengesInfo =Object.keys(data.challenges).map(key=>data.challenges[key])
//         setChallenges(challengesInfo)
//         setIsLoading(false)
        
//       })
//     },[])
// // sortJournalByChallenge().then(()=>{

// // })
// // console.log(challenges)

// // const data=[

// // ]



// //   return (
// //    <View>
// //     <TouchableOpacity>
// //         <Text></Text>
// //     </TouchableOpacity>
// //    </View>
// //   )
// }

// export default SortJournal

// const styles = StyleSheet.create({})