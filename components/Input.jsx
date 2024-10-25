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
                    placeholderTextColor={Themes.colors.grayMid}
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
                            color={Themes.colors.grayMid}
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
        backgroundColor: Themes.colors.grayLight,  
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Themes.colors.purpleStrong,  
    },
    input: {
        flex: 1,
        height: 48,
        paddingHorizontal: 16,
        color: Themes.colors.grayMid,
        fontSize: 16,
    },
    icon: {
        paddingHorizontal: 12,
    },
});
