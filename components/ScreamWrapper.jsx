import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreamWrapper = ({children,background}) => {
    const {top} = useSafeAreaInsets();
    const paddingTop = top>0? top+5: 30;
    return (
        <View style={{flex:1,paddingTop,backgroundColor:background}}>
        {children}
        </View>
    )

    
}

export default ScreamWrapper