import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Button from "../components/Button";


const password_recovery = () => {
return(
    <View style= {styles.container}> 
   
    <Text>Password Recovery </Text> 


<Text>Enter your email or username to search for your account</Text>


 </View>

)
} 

export default password_recovery

const styles = StyleSheet.create({
    container :{
    flex: 1,
    background : 'black',
    
    },
    

});