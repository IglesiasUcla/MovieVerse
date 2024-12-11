import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { Themes } from "../constants/Themes";
import InputSearch from "../components/InputSearch";
import PostComment from "../components/PostComment";
import { useRouter } from "expo-router"; // Importa el useRouter
import { searchUser } from "../helpers/movieverseApi";

const Search_user = () => {
  const router = useRouter();
  const [userTag, setUserTag] = useState("");
  const [resul, setResul] = useState([]);

  console.log(userTag);

  const handleSearch = async () => {
    if (!userTag) {
      Alert.alert("Por favor, llena todos los campos.");
      return;
    }
    try {
      const resul = await searchUser(userTag);
      setResul(resul);
      console.log("Resultado", userTag);
      console.log("Resultado", resul);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message || "Error desconocido");
    }
  };

  // Función para navegar al perfil del usuario
  const handleUserIconPress = () => {
    router.push("profile_user"); // Redirige a la pantalla de perfil
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View>
        <Header
          title="Search User"
          leftIconName="arrow-back"
          leftIconRoute={"/search"}
        />
        <InputSearch
          textSearch="search user"
          value={userTag}
          onChangeText={(text) => setUserTag(text)}
          onSearchPress={handleSearch}
        />
        <ScrollView style={styles.commentsContainer}>
          {resul && resul.length > 0 ? (
            resul.map((user) => (
              <PostComment
                key={user.user_id}
                userName={user.username}
                postReview={`Email: ${user.email}`}
              />
            ))
          ) : (
            <Text style={styles.noResultsText}>
              No hay resultados para mostrar.
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
