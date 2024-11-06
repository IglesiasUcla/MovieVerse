import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'
import { Themes } from '../constants/Themes'
import { heightPercentage } from '../helpers/commons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const InputPencil = ({title,textEdit}) => {
return (
    <View style={styles.fieldBody}>
            <Text style={styles.textDescription}>{title}</Text>
                <View style={styles.textField}>
                    <TextInput 
                        style={styles.dataField} 
                        placeholder={textEdit}
                        placeholderTextColor={Themes.colors.grayMid}
                    />
                    <MaterialCommunityIcons name="pencil-outline" size={24} color={Themes.colors.purpleStrong} />
                </View>
    </View>
)
}

export default InputPencil

const styles = StyleSheet.create({
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
        justifyContent:'flex-start',
    },
    textField:{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent:'flex-end',
        backgroundColor:Themes.colors.screensColor,  
        borderWidth: 1,
        borderBottomColor: Themes.colors.purpleDetail,
        height:heightPercentage(6),
        
    },
    dataField:{
        height: heightPercentage(4),
        width:'60%',
        // paddingLeft:widthPercentage(40),
        textAlign:'auto',
        color:'white',
        
    },
})