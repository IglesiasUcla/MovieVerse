import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Themes } from '../constants/Themes.js';
import { Ionicons } from '@expo/vector-icons';

const Input = ({ titleField, guideText, isPassword = false }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={styles.inputContainer}>
            {titleField && <Text style={styles.title}>{titleField}</Text>}
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={guideText}
                    placeholderTextColor={'#b0b0b0'}
                    textAlign='left'
                    secureTextEntry={isPassword && !isPasswordVisible}  // Alternar visibilidad de la contraseña
                />
                {isPassword && (
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setPasswordVisible(!isPasswordVisible)}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color={Themes.colors.grayLight}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
        width: '100%',
    },
    title: {
        color: 'white',
        fontSize: 16,
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',  
        borderRadius: 10, 
        
    },
    input: {
        flex: 1,
        height: 48,
        paddingHorizontal: 16,
        color: 'white',
        fontSize: 16,
        backgroundColor:'#333333',
        borderRadius: 20,  
    },
    icon: {
        paddingHorizontal: 12,
    },
});
