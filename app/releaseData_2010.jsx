import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Themes } from '../constants/Themes.js';
import SearchField from '../components/SearchField.jsx';
import { useRouter } from 'expo-router';
import TopBack from '../components/TopBackButton.jsx';
import { widthPercentage } from '../helpers/commons.js';

const releaseData_2010 = () => {
    const route= useRouter();
    return (
        <SafeAreaView style={styles.topBackContent}>
            <StatusBar style='dark'/>
            <TopBack
                title="Release Data" 
                topBackStyle={styles.topBack} 
                onPress={() => { route.push('releaseData_1'); }} 
                backgroundColor={Themes.colors.purpleStrong} 
                textColor="white"
            />
            <ScrollView style={styles.wrapSearch}>
                <SearchField
                    title="2019" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="2018" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="2017" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="2016" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="2015" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="2014" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="2013" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="2012" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="2011" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="2010" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default releaseData_2010

const styles = StyleSheet.create({
    topBackContent:{
        flex:1,
        backgroundColor: 'black',
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