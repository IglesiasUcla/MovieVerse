import { StyleSheet, Text, View,SafeAreaView,TextInput,StatusBar } from 'react-native'
import React from 'react'
import { heightPercentage, widthPercentage } from '../helpers/commons'
const Input = ({
    titleField= '',
    guideText= '',
}) => {
    return (
        <SafeAreaView style={[styles.container]}>
        <Text style={[styles.fieldName]}>{titleField}</Text>
        <TextInput style={[styles.input, styles.inputText]} placeholder={guideText} />
        <StatusBar style='auto'/>
        </SafeAreaView>
    )
}

export default Input

const styles = StyleSheet.create({
    container:{
        // flex:1,
        alignItems: 'flex-start',
        backgroundColor:'black',
    },

    fieldName:{
        color:'white',
        paddingLeft: 8,
        marginLeft: 12,
        fontSize: 14,
    },

    input:{
        height: heightPercentage(8),
        width: widthPercentage(73),
        margin: 0,
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor:'gray',
        textAlign: 'left',
        borderColor:'purple',
        marginTop:6,
        marginBottom:6,
    },

    inputText:{
        color:'white',
        marginLeft: 5,
        fontSize: 16,
    }

})
