import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Themes } from '../constants/Themes.js';
import SearchField from '../components/searchField.jsx';
import { useRouter } from 'expo-router';
import TopBack from '../components/topBackButtom.jsx';
import { widthPercentage } from '../helpers/commons.js';

const releaseData_1980 = () => {
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
                    title="1989" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1988" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1987" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1986" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1985" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1984" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1983" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1982" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1981" 
                    searchStyle={styles.search} 
                    onPress={() => { route.push(); }} 
                    backgroundColor={'black'} 
                    textColor="white" 
                    textStyle={styles.textSearch}
                />
                <SearchField
                    title="1980" 
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

export default releaseData_1980

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