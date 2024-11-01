import React from "react";
import {Text, View, StyleSheet, TextInput,TouchableOpacity,SafeAreaView} from "react-native";
import Button from "../components/Button";
import { Themes } from "../constants/Themes";
import { useRouter } from 'expo-router';
import Header from "../components/Header";
import Input from "../components/Input";
import ScreamWrapper from "../components/ScreenWrapper";


const Change_password = () =>{
    const route = useRouter();
return(
    <ScreamWrapper background={'black'}>
         <View>
            <Header
                title="Change Password"
                leftIconName="arrow-back"       
                leftIconRoute={"/welcome"}
        />  
            <View style ={styles.container_input}>
                <Text style={styles.descrip_text}>Your password must be a combination of 6 characters you remember. </Text>
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
                        onPress={() => { route.push(''); }} 
                        backgroundColor={Themes.colors.purpleLight} 
                        textColor="white" 
                    />
                    <Button
                        title="Confirm" 
                        buttonStyle={styles.button} 
                        onPress={() => { route.push(''); }} 
                        backgroundColor={Themes.colors.purpleStrong} 
                        textColor="white" 
                    />
            </View>
        
        </View>
        
    </ScreamWrapper>
    );
};

export default Change_password

const styles = StyleSheet.create ({
container :{
    flex: 1,
    backgroundColor : 'black', 
 },
descrip_text:{
    color: '#ffff',
    fontSize: 25,
    marginVertical: 20,
    
},
container_button:{
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 20,
},
button:{
    marginTop: 10,
    width: '40%',           // ancho del boton
    borderRadius: 10,
    marginHorizontal: 20,
},
container_input: {
    marginVertical: 25,
}

})