import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentage, widthPercentage } from '../helpers/commons'
import { Themes } from '../constants/Themes'

const Button = ({
    buttonStyle,
    textStyle,
    title= '',
    onPress=()=>{},
    hasShadow = true,
    backgroundColor = Themes.colors.purpleStrong,  // Valor por defecto acorde a tu tema
    textColor = 'white',  // Texto blanco por defecto en tema oscuro
}) => {
    // Aplicar sombra si hasShadow es verdadero
    const shadowStyle = hasShadow ? styles.shadow : {}

    return (
        <TouchableOpacity
            onPress={onPress} 
            style={[
                styles.button, 
                buttonStyle, 
                { backgroundColor }, 
                shadowStyle
            ]}
            accessibilityLabel={title}  // Añadimos accesibilidad básica
        >
            <Text style={[styles.text, textStyle, { color: textColor }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button:{
        height: heightPercentage(8),
        width: widthPercentage(36),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text:{
        fontSize: heightPercentage(2),
        fontWeight: Themes.fonts.medium,
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,  // Para dispositivos Android
    }
})
