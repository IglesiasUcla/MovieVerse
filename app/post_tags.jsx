import React from 'react'
import Header from "../components/Header";
import { StyleSheet, View, SafeAreaView, Text} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Themes } from "../constants/Themes";


const Post_tags = () =>{
  return(
    <SafeAreaView style={styles.container}>
         <StatusBar style='dark'/>
            <View>
               
                <Header
                    title="Add tags"
                    leftIconName="arrow-back"       
                    leftIconRoute={"profile_user/"} /> 
            </View>
            <View>
                <Text style={styles.a_texto}> Enter tags separates by commas</Text>
                <Text style={styles.color}></Text>
                <Text style={styles.b_texto}>Lorem, ipsum, dolor, sit, amet</Text>
            </View>

        </SafeAreaView> 
    )
}
export default Post_tags

const styles = StyleSheet.create({
   container: {
        backgroundColor : Themes.colors.grayDark,
        flex : 1,
    },
    a_texto: {
        color: '#ffff',
        marginVertical: 10,
    },
    b_texto:{
         color: '#ffff',
         
    },
    color:{
        backgroundColor: '#D3D3D3',
        marginTop: 1,
        height: 1
    }

})