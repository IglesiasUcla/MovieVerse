import React from "react";
import { Text, View, StyleSheet, Image,SafeAreaView } from "react-native";
import { useRouter } from "expo-router"; // Importar useRouter
import Button from "../components/Button";
import { Themes } from "../constants/Themes";
import ScreamWrapper from "../components/ScreenWrapper";
import Input from "../components/Input";
import { StatusBar } from 'expo-status-bar';

const Password_recovery = () => {
    const router = useRouter(); // Inicializar el router

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark' />
            <View style={styles.body} >
                <View>
                    <Image style={styles.iconTop} source={require('../assets/images/Star_Icon.png')} resizeMode='contain' />
                </View>
                <Text style={styles.title}>Password Recovery</Text>
                <View style={styles.email_text}>
                    <Input 
                        titleField="Enter your email or username to search for your account" 
                        guideText="Your email" 
                    />
                </View>
                <View style={styles.container_button}>
                    <Button
                        title="Cancel"
                        buttonStyle={styles.button}
                        onPress={() => { router.push('/login'); }} // Navegar a login
                        backgroundColor={Themes.colors.purpleLight}
                        textColor="black"
                    />
                    <Button
                        title="Search"
                        buttonStyle={styles.button}
                        onPress={() => { router.push('/passwordRecovery2'); }} // Navegar a passwordRecovery2
                        backgroundColor={Themes.colors.purpleStrong}
                        textColor="white"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Password_recovery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Themes.colors.screensColor,
    },
    title: {
        color: '#ffff',
        fontSize: 25,
        marginVertical: 20,
        fontWeight: Themes.fonts.extrabold,
    },
    email_text: {
        marginVertical: 40
    },
    container_button: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Espacio entre botones
        paddingHorizontal: 20,
        marginVertical: 10, // Reduce el espacio entre el input y los botones
    },
    button: {
        borderRadius: 8,
        paddingVertical: 8, // Reduce la altura del botón
        alignItems: 'center',
        marginBottom: 16,
        width: '45%', // Ancho del botón
    },
    iconTop: {
        justifyContent: 'flex-end',
        padding: 25,
        marginLeft: 275,
    },
    body:{
        marginVertical: 50,
    paddingHorizontal: 20,
    }
});
