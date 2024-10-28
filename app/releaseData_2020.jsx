import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Themes } from '../constants/Themes.js';
import SearchField from '../components/searchField.jsx';
import { useRouter } from 'expo-router';
import TopBack from '../components/topBackButtom.jsx';
import { widthPercentage } from '../helpers/commons.js';

const releaseData_2020 = () => {
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
            <View>
                <SearchField
                    title="2024" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_1'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
                <SearchField
                    title="2023" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_1'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
                <SearchField
                    title="2022" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_1'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
                <SearchField
                    title="2021" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_1'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
                <SearchField
                    title="2020" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push('releaseData_1'); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                />
            </View>
        </SafeAreaView>
    )
}

export default releaseData_2020

const styles = StyleSheet.create({
    topBackContent:{
        flex:1,
        backgroundColor: 'black',
    },
    topBack:{

    },
    search:{
        alignContent:'flex-start',
        paddingVertical: 5,
        marginTop: 20,
        marginLeft: 30,
        columnGap: 80,
        fontSize: widthPercentage(8),
    }
})