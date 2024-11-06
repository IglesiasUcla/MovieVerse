import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Themes } from '../constants/Themes';
import { widthPercentage } from '../helpers/commons'; 
import Button from '../components/Button.jsx';
import SideMenu from '../components/SideMenu.jsx';
import TopBack from '../components/TopBackButton.jsx';
import RatingFavorite from '../components/RatingFavorite.jsx';

const Test = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TopBack
                    title="ejemplo" 
                    topBackStyle={styles.topBack} 
                    onPress={() => { route.push('welcome'); }} 
                    backgroundColor={Themes.colors.purpleStrong} 
                    textColor="black"
                />
            <Button 
                title='Show Menu' 
                buttonStyle={{ marginHorizontal: widthPercentage(3) }}
                onPress={() => setMenuVisible(true)} 
                backgroundColor={Themes.colors.purpleStrong}
                textColor='white'
            />
            
            {/* Menú lateral animado */}
            <SideMenu 
                visible={menuVisible} 
                onClose={() => setMenuVisible(false)} 
                onSelectOption={(option) => { 
                    console.log('Selected option:', option);
                    setMenuVisible(false);
                }}
            />
            <RatingFavorite
                rating={4}
                isFavorite={true}
                starSize={64}    // Ajusta el tamaño si es necesario
                iconSize={12}    // Ajusta el tamaño si es necesario
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.grayDark,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Test;
