import { StyleSheet,Text,Pressable,View} from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes.js';
import { heightPercentage, widthPercentage } from '../helpers/commons.js';
import AntDesign from '@expo/vector-icons/AntDesign';

const TopBack = ({
        topBackStyle,
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
                                styles.backField,
                                topBackStyle,
                                {backgroundColor},

                        ]}
                        accessibilityLabel={title}
        >
                <Text style={[styles.text,textStyle, {color: textColor}]}>
                        <AntDesign style={styles.iconBack} name="arrowleft" size={34} color="white" />
                        {title}
                </Text>
        </Pressable>
        )
        
}

export default TopBack

const styles = StyleSheet.create({
        backField:{
                marginTop:3,
                paddingVertical:2,
                height: heightPercentage(6),
                width: '100%',
                flexWrap: 'wrap',
                columnGap: 40,
                alignItems: 'center',
                alignContent: 'flex-start',
                justifyContent:'space-evenly',
                borderRadius: 0,
                
                // paddingVertical:5,
        },
        iconBack:{
                alignSelf:'center',
                paddingTop:5,
                paddingLeft: 5,
        },
        text:{
                fontSize: heightPercentage(3),
                fontWeight: Themes.fonts.medium,
                paddingLeft: 20,
                marginLeft:60,
                alignSelf: 'flex-start',
                alignContent: 'space-between',
        },

})