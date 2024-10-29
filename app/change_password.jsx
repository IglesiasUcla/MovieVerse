import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Button from "../components/Button";

const change_password = () =>{
return(
    <View style= {styles.container}>
    <View>
           <Image style={styles.iconTop} source={require('../assets/images/Star_Icon.png')} resizeMode='contain'/>
    </View>
   
   
   <Text>Password Recovery </Text> 
   
   
   <Text>Enter your email or username to search for your account</Text>

   
   <input type="Your email" />
   
   <Button 
               title="Sign Up" 
               buttonStyle={styles.button} 
               onPress={() => { route.push('releaseData_1'); }} 
               backgroundColor={Themes.colors.purpleStrong} 
               textColor="white"/>
    </View>
    );
};

export default change_password

const styles = StyleSheet.create ({

container :{
flex: 1,
background : 'black',

},
button: {

},
iconTop: {
        justifyContent: 'flex-end',
        padding: 25,
        marginLeft: 275,
}
})