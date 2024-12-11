import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Themes } from '../constants/Themes';

// Pop-up de confirmación de descarte
const DiscardChangesPopup = ({ visible, onCancel, onDiscard,
   title = 'Discard Changes', 
   text = 'Are you sure you want to Discard Changes?', 
   purpleButton = 'Discard', 
  }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.popupContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{text}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDiscard} style={styles.discardButton}>
            <Text style={styles.discardText}>{purpleButton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const DiscardChangesPopup1 = ({ visible, onCancel, onDiscard,
  title = 'Discard Changes', 
  text = 'Are you sure you want to Discard Changes?', 
  purpleButton = 'Discard', 
 }) => (
 <Modal transparent visible={visible} animationType="fade">
   <View style={styles.overlay}>
     <View style={styles.popupContainer}>
       <Text style={styles.title}>{title}</Text>
       <Text style={styles.message}>{text}</Text>
       <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
         <TouchableOpacity onPress={onDiscard} style={styles.discardButton}>
           <Text style={styles.discardText}>{purpleButton}</Text>
         </TouchableOpacity>
       </View>
     </View>
   </View>
 </Modal>
);

// Pop-up de selección de foto
const PhotoSelectionPopup = ({ visible, onClose, onTakePhoto, onSelectPhoto }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.popupContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon name="close" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.photoOptionsContainer}>
          <TouchableOpacity onPress={onTakePhoto} style={styles.photoOption}>
            <Icon name="camera-alt" size={30} color="#6116ec" />
            <Text style={styles.optionText}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelectPhoto} style={styles.photoOption}>
            <Icon name="photo" size={30} color="#6116ec" />
            <Text style={styles.optionText}>Select photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: 280,
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  message: {
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  discardButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: Themes.colors.purpleStrong,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelText: {
    color: 'white',
  },
  discardText: {
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  photoOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  photoOption: {
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    marginTop: 4,
  },
});

export { DiscardChangesPopup, DiscardChangesPopup1, PhotoSelectionPopup };
