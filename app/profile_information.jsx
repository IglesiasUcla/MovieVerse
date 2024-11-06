import { StyleSheet, Text, View,SafeAreaView,ScrollView,TouchableOpacity,TextInput} from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { heightPercentage,widthPercentage } from '../helpers/commons';
import Button from '../components/Button';
import Header from '../components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import InputPencil from '../components/InputPencil';

const Profile_information = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* header */}
            <View>
                <Header
                    title="Profile Information"
                    leftIconName="arrow-back"       
                    leftIconRoute={"/profile_Settings"}
                />
            </View>
            <View style={styles.containerWrapper}>
                <View >
                    <Text style={styles.titleBody}> Signed in as user </Text>
                </View>
                <View style={styles.containerBody}>
                    <InputPencil
                        title="Name"
                        textEdit="your name"
                    />
                    <InputPencil
                        title="Phone"
                        textEdit="your phone number"
                    />
                    <InputPencil
                        title="Email"
                        textEdit="your email"
                    />
                    <InputPencil
                        title="Address"
                        textEdit="your address"
                    />
                    <InputPencil
                        title="Bio"
                        textEdit="something about you"
                    />
                </View>
                {/* favorites movies */}
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
                {/* footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerAvatarText}>Avatar</Text>
                    <View style={styles.footerItems}>
                        <View style={styles.avatarIcon}>
                            <FontAwesome5 name="user-circle" size={100} color={Themes.colors.purpleStrong} />
                        </View>
                        <View style={styles.iconsContainer}>
                            <FontAwesome style={styles.icons} name="cloud-upload" size={30} color={Themes.colors.purpleStrong} />
                            <AntDesign style={styles.icons} name="delete" size={30} color={Themes.colors.purpleStrong} />
                        </View>
                        <View style={styles.containerButton}>
                            <Button
                                title="Cancel" 
                                buttonStyle={styles.button} 
                                onPress={() => { route.push(); }} 
                                backgroundColor={Themes.colors.purpleLight} 
                                textColor="white" 
                            />
                            <Button
                                title="Save" 
                                buttonStyle={styles.button} 
                                onPress={() => { route.push(); }} 
                                backgroundColor={Themes.colors.purpleStrong} 
                                textColor="white" 
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile_information

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Themes.colors.screensColor,
        justifyContent:'space-between',
    },
    containerWrapper:{
        alignContent:'center',
        marginBottom:80,
    },
    titleBody:{
        color:'white',
        fontSize:24,
        fontWeight:Themes.fonts.extrabold,
        marginVertical:25,
        paddingLeft:10,
    },
    containerBody:{
        flexDirection:'column',
        paddingHorizontal:10,
        
    },
    fieldBody:{
        flexDirection:'row',
        alignItems:'baseline',
        justifyContent: 'space-evenly',
        paddingHorizontal:15,
        marginTop:8,
    },
    textDescription:{
        color:'white',
        fontSize:20,
        fontWeight: Themes.fonts.minimus,
        marginRight:75,
        alignItems:'flex-end',
        alignSelf:'flex-start',
        justifyContent:'flex-end',
    },
    textField:{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent:'flex-end',
        backgroundColor:'black',  
        borderWidth: 1,
        borderBottomColor: 'white',
        height:heightPercentage(6),
        
    },
    dataField:{
        height: heightPercentage(4),
        width:'60%',
        // paddingLeft:widthPercentage(40),
        textAlign:'auto',
        
    },
    favoriteMovies:{
        // alignItems:'left',
        marginTop:25,
        marginBottom:20,
        marginHorizontal:0,
    },
    localTitle:{
        color:'white',
        textAlign:'left',
        fontSize:26,
        fontWeight: Themes.fonts.bold,
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
    footer:{

    },
    footerAvatarText:{
        color:'white',
        fontSize:20,
        fontWeight:Themes.fonts.medium,
        marginLeft:25,
    },
    footerItems:{
        flexDirection:'row',
    },
    avatarIcon:{
        width: 140,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconsContainer:{
        flexDirection:'column',
        justifyContent:'center',
        marginHorizontal:20,
    },
    icons:{
        marginVertical:8,
    },
    containerButton:{
        flexDirection:'column',
        width:120,
        marginLeft:30,
        marginVertical:15,
    },
    button: {
        marginTop: 20,  
        width: '100%',  
        borderRadius: 10,  
        height:heightPercentage(3),
    },
})