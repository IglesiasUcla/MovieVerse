import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Welcome from './welcome'
import Create_account from './create_account'
import HomePage from './homePage'

const index = () => {
    // const router= useRouter();
    return <Welcome /> 
    // (
        // <View>
            
        {/* <Text>index</Text>
        <Button title='button' onPress={()=> router.push('welcome') } /> */}

        {/* </View> */}
    // )
}

export default index