import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import Header from '../components/Header'

const underConstruction = () => {
    return (
        <View style={styles.container}>
        <Header
            title="Release Date"
            leftIconName="arrow-back"       
            leftIconRoute={"/releaseData_2020"}
        />
        <Text style={styles.bigText}>under Construction</Text>
        </View>
    )
}

export default underConstruction

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Themes.colors.screensColor,
        
    },
    bigText:{
        fontSize:40,
        fontWeight:Themes.fonts.extrabold,
        color:'white',
        alignSelf:'center',
    },
})