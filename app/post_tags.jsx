import React, { useState } from 'react';
import Header from "../components/Header";  // Importa el Header
import { StyleSheet, View, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Themes } from "../constants/Themes";
import { useRouter } from 'expo-router';  // Importar useRouter para la navegación

const Post_tags = () => {
  const [tags, setTags] = useState("");  // Para manejar el texto ingresado por el usuario
  const router = useRouter();  // Inicializar el hook de navegación

  // Función que maneja el cambio de texto en el campo de entrada
  const handleInputChange = (input) => {
    setTags(input);
  };

  // Función que renderiza las etiquetas en el formato correcto
  const renderTags = () => {
    const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean); // Dividir por comas y eliminar espacios
    return tagsArray.map((tag, index) => (
      <Text key={index} style={styles.tag}>
        {tag}
      </Text>
    ));
  };

  // Función de "guardar" para simular el guardado de las etiquetas
  const handleSave = () => {
    console.log("Tags saved:", tags);
    router.push('movieReview');  // Redirigir a movieReview
  };

  return (
    <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />

      
      {/* Aquí está el Header con los estilos correctamente aplicados */}
      <Header
        title="Add tags"
        leftIconName="arrow-back"
        leftIconRoute="movieReview"  // Redirige a movieReview cuando se hace clic en el icono de retroceso
      />
      <View style={styles.bodyTags}>
        <Text style={styles.a_texto}>Enter tags separated by commas</Text>
        <Text style={styles.infoText}>Remember to start each tag with a <Text style={styles.hashtag}>#</Text></Text>

        {/* Campo de entrada para las etiquetas */}
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={handleInputChange}
          placeholder="e.g., #action, #drama, #comedy"
          placeholderTextColor={Themes.colors.grayLight}
        />

        <View style={styles.renderedTags}>
          {/* Mostrar las etiquetas ingresadas */}
          {renderTags()}
        </View>

        {/* Botón de "Guardar" */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post_tags;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.grayDark,
    flex: 1,
    // padding: 20,
  },
  bodyTags:{
    padding:20,
  },
  a_texto: {
    color: '#fff',
    marginVertical: 10,
    fontSize: 16,
  },
  infoText: {
    color: 'white',  // Color blanco
    marginVertical: 5,
    fontSize: 16,  // Tamaño de letra más grande
    fontWeight: 'bold',  // Para hacerlo más destacado
  },
  hashtag: {
    color: Themes.colors.purpleStrong,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Themes.colors.grayMid,
    color: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    fontSize: 16,
  },
  renderedTags: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Themes.colors.purpleStrong,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  // Estilo para el botón de guardar
  saveButton: {
    backgroundColor: Themes.colors.purpleStrong,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,  // Menos redondeado
    marginTop: 20,
    alignSelf: 'flex-start',  // Alinea el botón hacia la izquierda
    marginLeft: 20,  // Margen izquierdo para separarlo
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
