import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Themes } from "../constants/Themes";
import { useRouter, useNavigation } from "expo-router";
import { loginUser } from "../helpers/movieverseApi.js"; // Importa la función centralizada

const Login = () => {
  const route = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Por favor, llena todos los campos.");
      return;
    }

    try {
      const response = await loginUser({ email, password });

      if (response.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'homePage' }], // your stack screen name
      });
      } else {
        Alert.alert("Error al iniciar sesión", response.message);
        console.log("Error al iniciar sesión:", response.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error.message || "Error desconocido al iniciar sesión"
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Themes.colors.grayDark}
      />
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✦</Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.title}>Log In</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Your email"
        placeholderTextColor="#B0B0B0"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Your password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={!passwordVisible}
          style={styles.passwordInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.iconButton}
        >
          <Icon
            name={passwordVisible ? "eye" : "eye-slash"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.passwordRecoveryContainer}>
        <Text style={styles.forgotPasswordText}>Forgot your password? </Text>
        <Pressable onPress={() => route.push("password_recovery")}>
          <Text style={styles.passwordRecoveryText}>Password Recovery</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text
            style={styles.createAccountText}
            onPress={() => route.push("create_account")}
          >
            Create Account
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.grayDark,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  errorText: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },

  iconContainer: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  icon: {
    color: Themes.colors.purpleStrong,
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#333333",
    color: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333333",
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    color: "#ffffff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconButton: {
    paddingRight: 15,
  },
  loginButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  passwordRecoveryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#ffffff",
    fontSize: 14,
  },
  passwordRecoveryText: {
    color: "#ffffff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    color: "#ffffff",
    fontSize: 14,
  },
  createAccountText: {
    color: "#ffffff",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
