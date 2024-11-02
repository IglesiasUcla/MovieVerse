import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Header from "../components/Header";
import Input from "../components/Input";
import { styled } from "tailwindcss-react-native";
import { color } from "react-native-tailwindcss";

const Search_user =() => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark'/> 
                <View>
                    <Header 
                        
                        leftIconName="arrow-back"    
                        leftIconRoute={"/welcome"}/>  
                
                </View>
                <View style={styles.users}>
                    
                    <Text style={styles.one_user}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat. </Text>

                </View>
                <View style={styles.users_1}>
                    <Text style={styles.two_user}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat nec elit tempus vehicula. Pellentesque fringilla nisi id erat. </Text>
                </View>
            </SafeAreaView>
            
 )}
export default Search_user

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    users:
    {

    }, 
    users_1:{

    } ,
     one_user:{
        color: '#ffff',
        marginVertical: 50,
    },
        two_user:{
    color : '#fffff',
    marginVertical: 50,
    }

})