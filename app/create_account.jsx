import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import ScreamWrapper from '../components/ScreamWrapper'
import { StatusBar } from 'expo-status-bar'
import { Themes } from '../constants/Themes.js'
import { heightPercentage,widthPercentage } from '../helpers/commons.js'
import { useRouter } from 'expo-router';
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'

const create_account = () => {
    const route=useRouter();
    return (
        <ScreamWrapper background={'black'}>
            <StatusBar style='dark'/>
            <View style={styles.container}>
            <Text style={styles.tittle} >Create Account</Text>
                <View style={styles.elements}>
                    <Input 
                    titleField='username'
                    guideText='your username'
                    />
                    <Input 
                    titleField='email'
                    guideText='yourmail@example.com'
                    />
                    
                    <Input 
                    titleField='password'
                    guideText='your password'
                    />
                    <Input 
                    titleField='confirm password'
                    guideText='your password confirmation'
                    />
                    
                </View>
                <Button 
                title='Log In' 
                buttonStyle={{marginHorizontal:widthPercentage(40)}}
                onPress={()=>{route.push('welcome')}}
                backgroundColor={Themes.colors.purpleStrong}
                textColor={'white'}
                />
            </View>
        </ScreamWrapper>
    )
}

export default create_account

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        paddingHorizontal: widthPercentage(2),
    },

    tittle:{
        color: 'white',
        fontSize: heightPercentage(5),
        textAlign: 'left',
        fontWeight: Themes.fonts.extrabold,
    },

    elements:{
        alignItems: 'center',
    }

})