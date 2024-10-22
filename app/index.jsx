import { View, Text, Button } from 'react-native'
import React from 'react'
// import { useRouter } from 'expo-router';
import welcome from './welcome'

const startPage= welcome();
const index = () => {
    // const router= useRouter();
    return (
        <View>
            < startPage/>
        </View>
    )
}

export default index