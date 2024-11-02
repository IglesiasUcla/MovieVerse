import { StyleSheet, Text, View,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import TopBack from '../components/TopBackButton'
import { Themes } from '../constants/Themes'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { heightPercentage,widthPercentage } from '../helpers/commons';
import Button from '../components/Button';

const Other_user_information = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* header */}
            <View>
                <TopBack
                    title="Username" 
                    topBackStyle={styles.topBack} 
                    onPress={() => { route.push('releaseData_1'); }} 
                    backgroundColor={Themes.colors.purpleStrong} 
                    textColor="white"
                />
            </View>
            {/* body */}
            <View style={styles.profile}>
                <View style={styles.avatarIcon}>
                    <FontAwesome5 name="user-circle" size={140} color={Themes.colors.purpleStrong} />
                </View>
                <Text style={styles.title}>About User</Text>
                <View style={styles.infoLine} />
                <View style={styles.infoLine} />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Follow" 
                        buttonStyle={styles.button} 
                        onPress={() => { route.push(); }} 
                        backgroundColor={Themes.colors.purpleStrong} 
                        textColor="white"
                    />
                    <Button
                        title="View Post" 
                        buttonStyle={styles.button} 
                        onPress={() => { route.push(); }} 
                        backgroundColor={Themes.colors.purpleStrong} 
                        textColor="white"
                    />
                </View>
            </View>
            {/* footer */}
            <View style={styles.favoriteMovies}>
                <Text style={styles.localTitle}> Favorite Movies</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.containerMovies}
                >
                    {[1,2,3,4,5,6,7].map((item,index) =>(
                        <TouchableOpacity key={index} style={styles.box}>
                            <FontAwesome6 name="add" size={24} color={Themes.colors.purpleStrong} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Other_user_information

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        justifyContent:'space-between',
    },
    topBack:{

    },
    profile:{
        alignItems:'center',
        marginTop:10,
    },
    avatarIcon:{
        width: 140,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color:'white',
        fontSize:35,
        marginVertical:15,
        marginBottom:30,
    },
    infoLine:{
        width:widthPercentage(60),
        height: heightPercentage(1),
        backgroundColor: Themes.colors.purpleStrong,
        borderRadius:10,
        marginVertical: 5,
    },
    buttonContainer:{
        flexDirection:'row',

    },
    button: {
        marginTop: 20,  
        width: '30%',  
        height: heightPercentage(6),
        borderRadius: 10,  
        marginHorizontal:15,
    },
    favoriteMovies:{
        // alignItems:'left',
        marginTop:10,
        marginBottom:20,
    },
    localTitle:{
        color:'white',
        textAlign:'left',
        fontSize:26,
        marginBottom:15,
        marginHorizontal:20,
    },
    containerMovies:{
        paddingHorizontal:20,
    },
    box:{
        width:widthPercentage(20),
        height:heightPercentage(15),
        backgroundColor:'#d9d9d9',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        marginHorizontal:5,
    },
})