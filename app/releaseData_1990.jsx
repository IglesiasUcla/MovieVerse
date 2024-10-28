import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Themes } from '../constants/Themes.js';
import SearchField from '../components/searchField.jsx';
import { useRouter } from 'expo-router';
import TopBack from '../components/topBackButtom.jsx';
import { widthPercentage } from '../helpers/commons.js';

const releaseData_1990 = () => {
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
                    title="1999" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1998" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1997" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1996" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1995" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1994" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1993" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1992" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1991" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1990" 
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

export default releaseData_1990

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