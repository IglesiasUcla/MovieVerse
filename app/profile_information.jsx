import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, StatusBar, ActivityIndicator, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Themes } from '../constants/Themes';
import { heightPercentage, widthPercentage } from '../helpers/commons';
import Button from '../components/Button';
import Header from '../components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as ImagePicker from 'expo-image-picker'; // Importación para el picker de imágenes
import { useRouter } from 'expo-router';
import { getUser, updateUser } from '../helpers/movieverseApi';
import { PhotoSelectionPopup } from '../components/Popup';



const ProfileInformation = () => {
    const route = useRouter();
    const [userProfile, setUserProfile] = useState(null); // Estado para almacenar los datos del usuario
    const [loading, setLoading] = useState(true); // Estado de carga
    const [saving, setSaving] = useState(false); // Estado de guardar cambios
    const [showPhotoSelectionPopup, setShowPhotoSelectionPopup] = useState(false);

    // Campos del perfil
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null); // Estado para la foto de perfil

    // Cargar los datos del usuario al iniciar
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUser();
                setUserProfile(data.user); // Cargar datos del usuario
                setUsername(data.user.username || '');
                setBio(data.user.description || '');
                setProfilePicture(data.user.profile_picture || null); // Establecer foto de perfil
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('Failed to load user data.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    // Manejar la selección de la foto de perfil
    const handleProfilePicture = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission required", "You need to enable permission to access the gallery.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
        }setShowPhotoSelectionPopup(false);
    };

    // Manejar la selección de la foto de perfil
    const takeProfilePicture = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission required", "You need to enable permission to access the gallery.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
        }setShowPhotoSelectionPopup(false);
    };

    // Subir la foto de perfil al servidor
    const uploadProfilePicture = async () => {
        if (!profilePicture) {
            Alert.alert("No image selected", "Please select a profile picture to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', {
            uri: profilePicture,
            name: 'profile_picture.jpg',
            type: 'image/jpeg',
        });

        try {
            setSaving(true);
            const response = await updateUser(formData);
            if (response && response.message === "User updated successfully.") {

            } else {
                Alert.alert('Error', 'Failed to update profile picture. Please try again.');
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            Alert.alert('Error', 'An error occurred while updating the profile picture.');
        } finally {
            setSaving(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await updateUser({
                username,
                description: bio,
            });
    
            if (response && response.message === "User updated successfully.") {
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile. Please try again.');
            }
    
            console.log('response:', response);
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the profile.');
        } finally {
            setSaving(false);
        }
    };
    
    
    

    // Nueva función para ejecutar ambas acciones
    const handleSaveWithImage = async () => {
    if (saving) return; // Evita ejecutar si ya está guardando.

    setSaving(true);
    try {
        // Llamar a la función de carga de imagen
        await uploadProfilePicture();

        // Llamar a la función de guardar cambios
        await handleSave();


    } catch (error) {
        console.error("Error during combined save operation:", error);
        alert('An error occurred while updating the profile and uploading the picture.');
    } finally {
        setSaving(false);
    }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color={Themes.colors.purpleStrong} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
            {/* Header */}
            <Header
                title="Profile Information"
                leftIconName="arrow-back"
                leftIconRoute="/profile_Settings"
            />

            <ScrollView contentContainerStyle={styles.wrapper}>
                {/* User Information */}
                <View style={styles.infoSection}>
                    <TouchableOpacity style={styles.profilePictureContainer} onPress={() => setShowPhotoSelectionPopup(true)}>
                        {profilePicture ? (
                            <Image
                                source={{ uri: profilePicture }}
                                style={styles.profilePicture}
                            />
                        ) : (
                            <FontAwesome6 name="user-circle" size={116} color={Themes.colors.purpleStrong} />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.sectionTitle}>User Information</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        value={bio}
                        onChangeText={setBio}
                        multiline
                    />
                    
                </View>
            </ScrollView>

            {/* Save Button */}
            <View style={styles.footer}>
                <Button
                    title={saving ? "Saving..." : "Save"}
                    buttonStyle={styles.saveButton}
                    onPress={handleSaveWithImage} // Integrar la subida de imagen
                    disabled={saving}
                    backgroundColor={Themes.colors.purpleStrong}
                    textColor="white"
                />
            </View>
            <PhotoSelectionPopup
                visible={showPhotoSelectionPopup}
                onClose={() => setShowPhotoSelectionPopup(false)}
                onTakePhoto={takeProfilePicture}
                onSelectPhoto={handleProfilePicture}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.screensColor,
    },
    wrapper: {
        padding: 20,
    },
    infoSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 116,
        height: 116,
        borderRadius: 58, // Circular
        borderWidth: 1,
        borderColor: Themes.colors.purpleStrong,
    },    
    input: {
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    topMoviesSection: {
        marginBottom: 20,
    },
    moviesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    movieBox: {
        width: widthPercentage(28),
        height: heightPercentage(15),
        backgroundColor: '#d9d9d9',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyBox: {
        borderWidth: 1.5,
        borderColor: Themes.colors.purpleStrong,
    },
    movieText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Themes.colors.purpleStrong,
    },
    footer: {
        padding: 15,
        alignItems: 'center',
    },
    saveButton: {
        width: '100%',
        borderRadius: 10,
        height: heightPercentage(6),
    },
});

export default ProfileInformation;
