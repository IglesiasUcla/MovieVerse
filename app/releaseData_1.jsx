import { StyleSheet, Text, View ,SafeAreaView, Pressable} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Themes } from '../constants/Themes.js';
import SearchField from '../components/searchField.jsx';
import { heightPercentage } from '../helpers/commons.js';
import TopBack from '../components/topBackButtom.jsx';
import { useRouter } from 'expo-router';

const ReleaseData_1 = () => {
    const route= useRouter();
    return (
        <SafeAreaView style={styles.content}>
            <StatusBar style="dark" />
            {/* header */}
            <View style={styles.contentTop} >
                <TopBack
                    title="Release Data" 
                    topBackStyle={styles.topBack} 
                    onPress={() => { route.push('welcome'); }} 
                    backgroundColor={Themes.colors.purpleStrong} 
                    textColor="white"
                />
            </View>
            {/* body with options */}
                <SearchField
                    title="2020" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_2020'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
                <SearchField
                    title="2010" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_2010'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
                <SearchField
                    title="2000" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_2000'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
                <SearchField
                    title="1990" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_1990'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
                <SearchField
                    title="1980" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_1980'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
                <SearchField
                    title="1970" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_1970'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
            
        </SafeAreaView>
    )
}

export default ReleaseData_1

const styles = StyleSheet.create({
    content:{
        backgroundColor:'black',
        flex: 1,
    },
    contentTop:{
        backgroundColor:Themes.colors.purpleStrong,
        marginTop: 2,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        
    },
    topBack:{

    },
    textField:{
        fontWeight: Themes.fonts.medium,
    },
    titleTop:{
        fontSize: heightPercentage(3),
        paddingVertical: 6,
        color:'white',
        textAlign: 'left',
        fontWeight: Themes.fonts.medium,
        marginLeft:28,
    },
    iconArrow:{
        marginLeft: 20,
    },
    search:{
        alignContent:'flex-start',
        paddingVertical: 5,
        marginTop: 20,
        marginLeft: 30,
        columnGap: 80,
    }
})