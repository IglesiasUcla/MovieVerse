import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import { heightPercentage } from '../helpers/commons'
import Header from '../components/Header'
import SearchField from '../components/SearchField'
import { useRouter } from 'expo-router';

const Profile_Settings = () => {
  const route = useRouter();
  return (
    <SafeAreaView style={styles.container} >
        <View>
            <Header
                title="Profile Settings"
                leftIconName="arrow-back"       
                leftIconRoute={"/profile_user"}
        /> 
        </View> 
    <View style={styles.body}>

    <SearchField 
            title="Profile Information" 
            searchStyle={styles.search} 
            onPress={() => { route.push('profile_information'); }} 
            backgroundColor={'black'} 
            textColor="white"
            textStyle={styles.text_style} />
    <SearchField 
            title="Change Password" 
            searchStyle={styles.search} 
            onPress={() => { route.push('change_password'); }} 
            backgroundColor={'black'} 
            textColor="white" 
            textStyle={styles.text_style}/>
    </View>
    
  </SafeAreaView>
  )
}

export default Profile_Settings

const styles = StyleSheet.create({
container:{
      backgroundColor : 'black',
      flex : 1,
},
search :{
      alignContent: 'center',
      marginLeft: 15,
      marginVertical: 5 ,

        },
      text_style:
{
      fontSize: 20,
},
body: {
      marginTop: 20,
},
})