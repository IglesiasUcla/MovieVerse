import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Themes } from '../constants/Themes.js';
import SearchField from '../components/SearchField.jsx';
import { useRouter } from 'expo-router';
import Header from '../components/Header.jsx';
import { widthPercentage } from '../helpers/commons.js';

const releaseData_1970 = () => {
    const route= useRouter();
    return (
        <SafeAreaView style={styles.topBackContent}>
            <StatusBar style='dark'/>
            <Header
                    title="Release Date"
                    leftIconName="arrow-back"       
                    leftIconRoute={"/releaseData_1"}
            />
            <ScrollView style={styles.wrapSearch}>
                <SearchField
                    title="1979" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={Themes.colors.screensColor} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1978" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={Themes.colors.screensColor} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1977" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={Themes.colors.screensColor} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1976" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={Themes.colors.screensColor} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1975" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={Themes.colors.screensColor} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1974" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'Themes.colors.screensColor'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1973" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={Themes.colors.screensColor} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1972" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={Themes.colors.screensColor} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1971" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={Themes.colors.screensColor} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1970" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={Themes.colors.screensColor} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default releaseData_1970

const styles = StyleSheet.create({
    topBackContent:{
        flex:1,
        backgroundColor: Themes.colors.screensColor,
    },
    topBack:{

    },
    wrapSearch:{
        padding:2,
    },
    search:{
        alignContent:'flex-start',
        paddingVertical: 2,
        marginTop: 0,
        marginLeft: 30,
        // columnGap: 80,
        // fontSize: widthPercentage(4),
    },
    textSearch:{
        fontSize:widthPercentage(10),
    }
})