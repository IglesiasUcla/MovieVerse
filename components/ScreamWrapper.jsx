import { View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreamWrapper = ({ children, background }) => {
    const { top } = useSafeAreaInsets();
    
    // Mantener un padding superior dinámico según el espacio seguro del dispositivo
    const paddingTop = top > 0 ? top + 5 : 30;
    
    return (
        <View
            style={{
                flex: 1,
                paddingTop,
                paddingHorizontal: 16,  // Margen lateral de 16px
                paddingBottom: 16,  // Margen inferior de 16px
                backgroundColor: background,  // Color de fondo que recibes como prop
            }}
        >
            {children}
        </View>
    );
};

export default ScreamWrapper;
