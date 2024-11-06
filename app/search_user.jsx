import React from "react"; 
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from "../components/Header";
import { Themes } from "../constants/Themes";
import InputSearch from "../components/InputSearch";
import PostComment from "../components/PostComment";
import { useRouter } from 'expo-router'; // Importa el useRouter

const Search_user = () => {
    const router = useRouter(); // Usa el hook useRouter para navegar
    
    // Función para navegar al perfil del usuario
    const handleUserIconPress = () => {
        router.push('profile_user'); // Redirige a la pantalla de perfil
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark'/> 
            <View>
                <Header 
                    title="Search User"
                    leftIconName="arrow-back"    
                    leftIconRoute={"/search"}
                />  
                <InputSearch textSearch="search user" />
                <ScrollView style={styles.commentsContainer}>
                    {/* Comentarios con el mismo diseño que tenías originalmente */}
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                        onPressUser={handleUserIconPress}
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                        onPressUser={handleUserIconPress}
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                        onPressUser={handleUserIconPress}
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                        onPressUser={handleUserIconPress}
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                        onPressUser={handleUserIconPress}
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                        onPressUser={handleUserIconPress}
                    />
                    <PostComment
                        userName="userName"
                        postReview="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusantium a eum deleniti officia esse? Hic consectetur aspernatur sit in recusandae,"
                        onPressUser={handleUserIconPress}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default Search_user;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.screensColor, // Manteniendo el color original de fondo
    },
    commentsContainer: {
        paddingVertical: 10,
    },
});
