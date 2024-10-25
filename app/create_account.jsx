import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreamWrapper from '../components/ScreamWrapper';
import { StatusBar } from 'expo-status-bar';
import { Themes } from '../constants/Themes.js';
import { heightPercentage, widthPercentage } from '../helpers/commons.js';
import { useRouter } from 'expo-router';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

const Create_account = () => {
    const route = useRouter();
    
    return (
        <ScreamWrapper background={Themes.colors.grayDark}>
            <StatusBar style="light" />
            <View style={styles.container}>
                <Text style={styles.title}>Create Account</Text>
                <View style={styles.elements}>
                    <Input 
                        titleField="Username" 
                        guideText="Your username" 
                    />
                    <Input 
                        titleField="Email" 
                        guideText="yourmail@example.com" 
                    />
                    <Input 
                        titleField="Password" 
                        guideText="Your password"
                        isPassword
                    />
                    <Input 
                        titleField="Confirm Password" 
                        guideText="Repeat password"
                        isPassword
                    />
                </View>
                <Button 
                    title="Sign Up" 
                    buttonStyle={styles.button} 
                    onPress={() => { route.push('welcome'); }} 
                    backgroundColor={Themes.colors.purpleStrong} 
                    textColor="white" 
                />
            </View>
        </ScreamWrapper>
    );
};

export default Create_account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',  
        paddingHorizontal: 16,  
    },

    title: {
        color: 'white',
        fontSize: heightPercentage(5),
        textAlign: 'left',
        fontWeight: Themes.fonts.extrabold,
        marginBottom: 20,  
    },

    elements: {
        alignItems: 'center',
        marginBottom: 30,  
    },

    button: {
        marginTop: 20,  
        width: '100%',  
        borderRadius: 10,  
    }

});
