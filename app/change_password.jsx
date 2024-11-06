import React from "react";
import {Text, View, StyleSheet,TouchableOpacity,SafeAreaView} from "react-native";
import Button from "../components/Button";
import { Themes } from "../constants/Themes";
import { useRouter } from 'expo-router';
import Header from "../components/Header";
import Input from "../components/Input";
import ScreamWrapper from "../components/ScreenWrapper";
import { StatusBar } from 'expo-status-bar';
import { theme } from "react-native-tailwindcss";


const Change_password = () =>{
    const route = useRouter();
return(
    <SafeAreaView style={styles.container}>
        <StatusBar style='dark'/>
         <View>
            
            <Header
                title="Change Password"
                leftIconName="arrow-back"       
                leftIconRoute={"/profile_Settings"}
        />  
            <View style ={styles.container_input}>
                <Text style={styles.descrip_text}>Your password must be a combination of 6 characters you remember. </Text>
                <Input 
                        titleField="Current Password"
                        guideText="Your Password"
                        isPassword/>
                    <Input
                        titleField="New Password"
                        guideText="New Password"
                        isPassword
                    />
                    <Input
                        titleField="Confirm New Password"
                        guideText="Confirm New Password"
                        isPassword
                    />
                </View>
                <View style={styles.container_button}>
                    <Button
                        title="Cancel" 
                        buttonStyle={styles.button} 
                        onPress={() => { route.push('profile_Settings'); }} 
                        backgroundColor={Themes.colors.purpleLight} 
                        textColor="white" 
                    />
                    <Button
                        title="Confirm" 
                        buttonStyle={styles.button} 
                        onPress={() => { route.push('profile_user'); }} 
                        backgroundColor={Themes.colors.purpleStrong} 
                        textColor="white" 
                    />
            </View>
        
        </View>
        
    </SafeAreaView>
    );
};

export default Change_password

const styles = StyleSheet.create ({
container :{
    flex: 1,
    backgroundColor : Themes.colors.screensColor,
 },
descrip_text:{
    color: '#ffff',
    fontSize: 25,
    marginVertical: 20,
    
},
container_button:{
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginVertical: 20,
},
button:{
    marginTop: 10,
    width: '40%',           // ancho del boton
    borderRadius: 15,
    marginHorizontal: 22,
},
container_input: {
    marginVertical: 25,
    paddingHorizontal: 20,

}


})