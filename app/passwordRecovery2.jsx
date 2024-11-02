import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const PasswordRecovery2 = () => {
  const route = useRouter();

  return (
    <View style={styles.container}>
      {/* Icono decorativo */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✦</Text>
      </View>

      {/* Título */}
        <View style={styles.titleContainer}>
            <Text style={styles.title}>We will send you a code to your email</Text>
        </View>
      {/* Mensaje y correo */}
        <View>
            <Text style={styles.message}>We can send a login code to:</Text>
            <Text style={styles.email}>usermail@gmail.com</Text>
        </View>
        

      {/* Avatar de usuario */}
        <View>
            <View style={styles.avatarContainer}>
                <Ionicons name="person" size={90} color="#6116EC" />
            </View>
                <Text style={styles.userName}>User</Text>
                <Text style={styles.userRole}>MovieVerse User</Text>
        </View>

      {/* Botón "Login with password" */}
      <TouchableOpacity onPress={() => route.push('login')} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login with password</Text>
      </TouchableOpacity>

      {/* Botón "Continue" */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordRecovery2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 16,
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  icon: {
    color: Themes.colors.purpleStrong,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    color: '#B0B0B0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  email: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  avatarIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Themes.colors.purpleStrong,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 40,
  },
  userName: {
    marginTop: 8,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  userRole: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  continueButton: {
    backgroundColor: Themes.colors.purpleStrong,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6116EC',
  }
});
