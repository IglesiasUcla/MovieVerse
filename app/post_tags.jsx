import React from 'react'
import Header from "../components/Header";
import { StyleSheet, View, SafeAreaView, Text} from 'react-native'
import { StatusBar } from 'expo-status-bar';


const Post_tags = () =>{
  return(
    <SafeAreaView style={styles.container}>
        
            <View>
                <StatusBar style='dark'/>
                <Header
                    title="Add tags"
                    leftIconName="arrow-back"       
                    leftIconRoute={"/welcome"} /> 
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
        backgroundColor : 'black',
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
        backgroundColor: '#D3D3D3'
    }

})