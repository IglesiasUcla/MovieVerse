import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentage, widthPercentage } from "../helpers/commons";

const InputSearch = ({ textSearch, value, onChangeText, onSearchPress }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.searchWrapper}>
        {/* Botón de búsqueda */}
        <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
          <Ionicons
            style={styles.iconSearch}
            name="search"
            size={32}
            color="white"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.inputSearch}
          placeholder={textSearch}
          placeholderTextColor={"#4d4d4d"}
          textAlign="center"
          fontSize={15}
          value={value} // Estado conectado
          onChangeText={onChangeText} // Función para actualizar el estado
        />
      </View>
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchWrapper: {
    flexDirection: "row",
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  inputSearch: {
    color: "white",
    alignContent: "center",
    backgroundColor: "#333333",
    borderRadius: 18,
    width: widthPercentage(68),
    height: heightPercentage(6),
    marginLeft: 10,
  },
  iconSearch: {
    marginLeft: 5,
  },
  iconButton: {
    padding: 5, // Espaciado adicional para facilitar el toque
    borderRadius: 20, // Opcional: mejor estética
  },
});
