import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Welcome from './welcome'
import Profile_information from './profile_information'
import ReleaseData_1 from './releaseData_1'
import Create_account from './create_account'
import HomePage from './homePage'
import Test from './test'
import Login from './login'
import Profile_user from './profile_user'
import AddMovie from './addMovie'
import MovieReview from './movieReview'

const index = () => {
    // const router= useRouter();
    return <Welcome /> 

    // return <Profile_information/>

    // (
        // <View>
            
        {/* <Text>index</Text>
        <Button title='button' onPress={()=> router.push('welcome') } /> */}

        {/* </View> */}
    // )
}

export default index