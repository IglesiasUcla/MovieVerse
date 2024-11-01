import React from "react";
import {Text, View, StyleSheet,TextInput,Image} from "react-native";
import Button from "../components/Button";
import { Themes } from "../constants/Themes";
import { heightPercentage } from "../helpers/commons";
import ScreamWrapper from "../components/ScreenWrapper";
import Input from "../components/Input";

const Password_recovery = () => {
return(
    <ScreamWrapper background='black'>
         <View style={styles.container}>

            <View>
                    <Image style={styles.iconTop} source={require('../assets/images/Star_Icon.png')} resizeMode='contain'/>
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
                        onPress={() => { route.push(''); }} 
                        backgroundColor={Themes.colors.purpleLight} 
                        textColor="black" 
                    />
                    <Button
                        title="Search" 
                        buttonStyle={styles.button} 
                        onPress={() => { route.push(''); }} 
                        backgroundColor={Themes.colors.purpleStrong} 
                        textColor="white" 
                    />
                </View>
       </View>
    </ScreamWrapper>

)
} 

export default Password_recovery

const styles = StyleSheet.create ({
container: {
    flex : 1,
    backgroundColor: 'black'
},
title:{
    color: '#ffff',
    fontSize: 25,
    marginVertical: 20,
    fontWeight: Themes.fonts.extrabold,
},
email_text:{
    marginVertical: 40
},
container_button:{
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 20,
},
button:{
    marginTop: 15,
    width: '35%',           // ancho del boton
    borderRadius: 20,
    marginHorizontal: 20,
},
iconTop:{
    justifyContent: 'flex-end',
    padding: 25,
    marginLeft: 275,},

        
})