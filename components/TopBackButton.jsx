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
        <View style={[styles.topWrapper]}>
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
        </View>
        )
        
}

export default TopBack

const styles = StyleSheet.create({
        topWrapper:{
                flexDirection:'row',
                alignItems: 'center',
        },
        backField:{
                // marginTop:3,
                paddingVertical:2,
                height: heightPercentage(6),
                width: widthPercentage(180),
                flexWrap: 'wrap',
                rowGap: 40,
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
                paddingRight: 68,
                marginRight: 50,
        },
        text:{
                fontSize: heightPercentage(3),
                fontWeight: Themes.fonts.medium,
                paddingHorizontal: 30,
                marginLeft:90,
                alignSelf: 'flex-start',
                alignContent: 'space-between',
        },

})