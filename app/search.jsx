import React from "react";
import { StyleSheet, View, SafeAreaView} from 'react-native'
import Button from "../components/Button";
import Header from "../components/Header";
import { Themes } from "../constants/Themes";
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Search = () => { 
    const router = useRouter(); 
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark'/> 

            <View>
               
                <Header
                title="Search"
                leftIconName="arrow-back"       
                leftIconRoute={"/homePage"}
        /> 
                </View>
                <View style={styles.container_button}>  
                    <View style={styles.elemento_bottun}>
                        <Button
                            title="Movies" 
                            buttonStyle={styles.button} 
                            onPress={() => { router.push('movieScreen'); }} 
                            backgroundColor={Themes.colors.purpleStrong} 
                            textColor="white" 
                        />
                    </View>
                    <View style={styles.elemento_posts}>
                        <Button
                            title="Posts" 
                            buttonStyle={styles.button} 
                            onPress={() => { router.push(''); }} 
                            backgroundColor={Themes.colors.purpleStrong} 
                            textColor="white" 
                        />
                        </View>
                    <View style={styles.elemento_users}>
                        <Button
                            title="Users" 
                            buttonStyle={styles.button} 
                            onPress={() => { router.push('profile_user'); }} 
                            backgroundColor={Themes.colors.purpleStrong} 
                            textColor="white" 
                        />
                </View>
            </View>
        </SafeAreaView>

    )
}
export default Search

const styles = StyleSheet.create({
    container:{
        backgroundColor:Themes.colors.grayDark,
        flex : 1,

},
    elemento_bottun: {
        marginTop: 20,
        width: '35%',           // ancho del boton
        borderRadius: 20,
        marginVertical: 20,
        marginHorizontal: 120
    },
    elemento_posts: {
        marginTop: 20,
        width: '35%',           // ancho del boton
        borderRadius: 20,
        marginVertical: 20,
        marginHorizontal: 120
    },
    elemento_users: {
        marginTop: 20,
        width: '35%',           // ancho del boton
        borderRadius: 20,
        marginVertical: 20,
        marginHorizontal: 120
    },
    container_button:{
    justifyContent: 'center',
    marginVertical: 150,
    },

})