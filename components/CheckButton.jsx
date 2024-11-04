import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { Themes } from '../constants/Themes';

const CheckButton = ({textCheck, isCheck = false })  => {
    const [isCheckVisible, setCheckVisible] =useState(false);
    
    return (
        <View style={styles.checkBox}>
            
            {isCheck && (
                <TouchableOpacity
                    style={styles.icon}
                    onPress={()=> setCheckVisible(!isCheckVisible)}
                >
                    <AntDesign 
                    name={isCheckVisible ? 'checkcircle' : 'checkcircleo'} 
                    size={20} 
                    color={Themes.colors.purpleStrong}/>
                </TouchableOpacity>

            )}
            <Text style={styles.checkText}> {textCheck}</Text>
        </View>
    )
}

export default CheckButton

const styles = StyleSheet.create({
    checkBox:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
    },
    checkText:{
        color:'white',
        fontSize:16,
        marginHorizontal:10,
        
    },
})