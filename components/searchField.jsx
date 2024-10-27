import { StyleSheet,Text,Pressable,View} from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes.js';
import { heightPercentage, widthPercentage } from '../helpers/commons.js';
import AntDesign from '@expo/vector-icons/AntDesign';

const SearchField = ({
        searchStyle,
        textStyle,
        title= '',
        onPress=()=>{},
        backgroundColor = Themes.colors.purpleStrong, //default value
        textColor= 'white',
}) => {
        return (
        <Pressable
                onPress={onPress}
                        style={[
                                styles.search,
                                searchStyle,
                                {backgroundColor},

                        ]}
                        accessibilityLabel={title}
        >
                <Text style={[styles.text,textStyle, {color: textColor}]}>
                        {title}
                        <View style={styles.iconSearch}>
                                <AntDesign name="rightcircleo" size={30} color="white" />
                        </View>
                </Text>
        </Pressable>
        )
        
}

export default SearchField

const styles = StyleSheet.create({
        search:{
                
                height: heightPercentage(12),
                width: widthPercentage(90),
                flexWrap: 'wrap',
                columnGap: 40,
                // alignItems: 'flex-end',
                alignContent: 'space-between',
                borderRadius: 0,
                // paddingVertical:5,
        },
        iconSearch:{
                justifyContent:'flex-end',
                alignSelf: 'flex-end',
                paddingLeft: 0,
                alignSelf: 'flex-end',
        },
        text:{
                fontSize: heightPercentage(7),
                fontWeight: Themes.fonts.medium,
                width: widthPercentage(120),
                alignSelf: 'flex-start',
                alignContent: 'space-between',
        },

})
