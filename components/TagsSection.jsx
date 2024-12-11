import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Tags from 'react-native-tags';
import { Themes } from '../constants/Themes';

const TagsSection = ({ tags, onAddTag, onRemoveTag }) => {
  return (
    <View style={styles.container}>
      <Tags
        initialTags={tags}
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
        renderTag={({ tag, index, onPress }) => (
          <TouchableOpacity
            key={`${tag}-${index}`}
            style={styles.tag}
            onPress={onPress}>
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  tagsContainer: {
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: '#6200ee',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  input: {
    fontSize: 16,
    color: '#000',
    backgroundColor: Themes.colors.purpleLight, // Cambiar color del fondo
    borderRadius: 10, // Opcional, para un diseño más suave
  },
});

export default TagsSection;
