import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Welcome from './welcome'
import ReleaseData_1 from './releaseData_1'
import Create_account from './create_account'
import HomePage from './homePage'
import Test from './test'

const index = () => {
    // const router= useRouter();
    // return <Welcome /> 
    return <Welcome/>
    // (
        // <View>
            
        {/* <Text>index</Text>
        <Button title='button' onPress={()=> router.push('welcome') } /> */}

        {/* </View> */}
    // )
}

export default index