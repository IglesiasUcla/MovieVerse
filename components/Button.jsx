import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { heightPercentage, widthPercentage } from '../helpers/commons'
import { Themes } from '../constants/Themes'

const Button = ({
    buttonStyle,
    textStyle,
    title= '',
    onPress=()=>{},
    hasShadow = true,
    backgroundColor,
    textColor,
}) => {
    const shadowStyle={}
    return (
        <Pressable onPress={onPress} style={[styles.button, buttonStyle,
            { backgroundColor },hasShadow && shadowStyle]}>
            <Text style={[styles.text, textStyle,{color: textColor}]}>{title}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    button:{
        height: heightPercentage(8),
        width: widthPercentage(36),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: 10,
    },

    text:{
        fontSize: heightPercentage(2),
        fontWeight: Themes.fonts.medium,
        
    }
})