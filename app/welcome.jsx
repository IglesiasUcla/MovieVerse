import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ScreamWrapper from '../components/ScreenWrapper.jsx'
import { StatusBar } from 'expo-status-bar'
import { Themes } from '../constants/Themes.js'
import { heightPercentage,widthPercentage } from '../helpers/commons.js'
import Button from '../components/Button.jsx'
import { useRouter } from 'expo-router';

 Welcome = () => {
    const route=useRouter();
    return (
        <ScreamWrapper background={Themes.colors.purpleDark}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleDark} />
            {/* logo */}
            <View style={styles.container}>
                <Image style={styles.log} source={require('../assets/images/logo-m.png')} resizeMode='contain'/>
            </View>
            {/* Principal text */}
            <View style={{gap:15}}>
                <Text style={styles.tittle} >Explore MovieVerse</Text>
                <Text style={styles.infotext}> Connect with your favorites movies</Text>
            </View>
            {/* footer buttons */}
            <View style={styles.footer}>
                <Button 
                title='Log In' 
                buttonStyle={{marginHorizontal:widthPercentage(3)}}
                onPress={()=>{route.push('login')}}
                backgroundColor={Themes.colors.purpleStrong}
                textColor={'white'}
                />
                <Button 
                title='Create Account' 
                buttonStyle={{marginHorizontal:widthPercentage(3)}}
                onPress={()=>{route.push('create_account')}}
                backgroundColor={Themes.colors.purpleLight}
                textColor={'black'}
                />
            </View>
        </ScreamWrapper>

    )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Themes.colors.purpleDark,
        paddingHorizontal: widthPercentage(2),
    },

    log:{
        height: heightPercentage(50),
        width: widthPercentage(50),
        alignSelf: 'center',
    },

    tittle:{
        color: 'white',
        fontSize: heightPercentage(5),
        textAlign: 'center',
        fontWeight: Themes.fonts.extrabold,
    },

    info:{
        color: 'white',
        fontSize: heightPercentage(3),
        textAlign: 'center',
        fontWeight: Themes.fonts.bold,
    },

    infotext:{
        color: 'gray',
        fontSize: heightPercentage(3),
        textAlign: 'center',
        fontWeight: Themes.fonts.minimus,
        paddingTop: 3,
        marginBottom: 30,
    },
    footer:{
        gap:20,
        width:'100%',
        marginBottom:60,
        alignItems: 'center',
    }
})