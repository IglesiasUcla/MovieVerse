import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Themes } from '../constants/Themes';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Icono decorativo */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✦</Text>
      </View>

      <Text style={styles.title}>Log In</Text>

      {/* Campo de Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Your email"
        placeholderTextColor="#B0B0B0"
        style={styles.input}
      />

      {/* Campo de Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Your password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={!passwordVisible}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconButton}>
          <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Botón de Log In */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Texto de recuperación de contraseña */}
      <View style={styles.passwordRecoveryContainer}>
        <Text style={styles.forgotPasswordText}>Forgot your password? </Text>
        <Pressable>
          <Text style={styles.passwordRecoveryText}>Password Recovery</Text>
        </Pressable>
      </View>

      {/* Enlace de creación de cuenta, centrado en la parte inferior */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don’t have an account?{' '}
          <Text style={styles.createAccountText}>Create Account</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333333',
    color: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    color: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconButton: {
    paddingRight: 15,
  },
  loginButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  passwordRecoveryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#ffffff', // Texto "Forgot your password?" en blanco
    fontSize: 14,
  },
  passwordRecoveryText: {
    color: '#ffffff', // "Password Recovery" en blanco y estilo de enlace
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
  },
  createAccountText: {
    color: '#ffffff', // "Create Account" en blanco
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default Login;
