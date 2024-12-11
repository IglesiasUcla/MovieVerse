import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Tags from "react-native-tags";
import { Themes } from "../constants/Themes";

const TagsSection = ({ tags, onAddTag, onRemoveTag }) => {
  // Usamos map fuera de renderTag para recorrer los tags
  const renderedTags = tags.map((tag, index) => (
    <TouchableOpacity
      key={`${tag}-${index}`}
      style={styles.tag}
      onPress={() => {}}
    >
      <Text style={styles.tagText}>{`${tag}`}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <Tags
        initialTags={tags} // Usamos los tags como base
        onChangeTags={(updatedTags) => {
          // Detectar si un tag fue eliminado
          const removedTag = tags.find((tag) => !updatedTags.includes(tag));
          if (removedTag) {
            onRemoveTag(removedTag);
          }

          // Detectar si un tag fue agregado
          const newTag = updatedTags.find((tag) => !tags.includes(tag));
          if (newTag) {
            onAddTag(newTag);
          }
        }}
        textInputProps={{
          style: styles.input,
        }}
        containerStyle={styles.tagsContainer}
        inputStyle={styles.input}
        tagContainerStyle={styles.tag}
        tagTextStyle={styles.tagText}
        renderTag={() => null} // No usamos renderTag aquí, ya que los tags se gestionan por fuera
      />
      {/* Renderizamos los tags mapeados afuera de renderTag */}
      <View style={styles.renderedTagsContainer}>{renderedTags}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  tagsContainer: {
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "#6200ee",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
  },
  input: {
    fontSize: 16,
    color: "#000",
    backgroundColor: Themes.colors.purpleLight, // Cambiar color del fondo
    borderRadius: 10, // Opcional, para un diseño más suave
  },
  renderedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});

export default TagsSection;
