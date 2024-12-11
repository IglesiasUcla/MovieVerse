import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ScreamWrapper from "../components/ScreenWrapper.jsx";
import { StatusBar } from "expo-status-bar";
import { Themes } from "../constants/Themes.js";
import { heightPercentage, widthPercentage } from "../helpers/commons.js";
import { useRouter } from "expo-router";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import AntDesign from "@expo/vector-icons/AntDesign";
import CheckButton from "../components/CheckButton.jsx";
import Icon from "react-native-vector-icons/FontAwesome";
import { registerUser } from "../helpers/movieverseApi.js";

const Create_account = () => {
  const route = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRegister = async () => {
    if (password !== confPassword) {
      Alert.alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await registerUser({ username, email, password, confPassword }); // Usamos la nueva función
      if (response.success) {
        Alert.alert("Usuario registrado exitosamente");
        route.push("homePage");
      } else {
        Alert.alert("Error al crear usuario:", response.message);
        console.log("error la crear usuario", response.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message || "Error desconocido al crear usuario");
    }
  };

  return (
    <ScreamWrapper background={Themes.colors.grayDark}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View>
          <Image
            style={styles.iconTop}
            source={require("../assets/images/Star_Icon.png")}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Create Account</Text>
        <View>
          <Text style={styles.title2}>Username</Text>
          <TextInput
            placeholder="Your username"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={styles.title2}>Email</Text>
          <TextInput
            placeholder="Your email"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Text style={styles.title2}>Password</Text>
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

          <Text style={styles.title2}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Repeat password"
              placeholderTextColor="#B0B0B0"
              secureTextEntry={!passwordVisible}
              style={styles.passwordInput}
              value={confPassword}
              onChangeText={(text) => setConfPassword(text)}
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

          <View style={styles.elements}>
            <CheckButton
              isCheck
              textCheck="I accept the terms and privacy policy"
            />
          </View>
          <View style={styles.footer}>
            <Button
              title="Sign Up"
              buttonStyle={styles.button}
              onPress={handleRegister}
              backgroundColor={Themes.colors.purpleStrong}
              textColor="white"
            />
            <View style={styles.link}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Text
                style={styles.redirectionText}
                onPress={() => {
                  route.push("login");
                }}
              >
                Log in
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScreamWrapper>
  );
};

export default Create_account;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
  
    iconTop: {
      justifyContent: "flex-end",
      padding: 25,
      marginLeft: 275,
    },
    inputContainer: {
      width: "100%",
      marginBottom: 15,
    },
    inputLabel: {
      color: "#fff",
      fontSize: 16,
      marginBottom: 5,
    },
    passwordInput: {
      flex: 1,
      color: "#ffffff",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    input: {
      width: "100%",
      height: 48,
      borderWidth: 1,
      backgroundColor: "#333333",
      borderRadius: 10,
      paddingLeft: 15,
      fontSize: 16,
      color: "#fff",
      backgroundColor: "#333333",
    },
    title2: {
      color: "#fff",
      fontSize: 16,
      marginBottom: 10,
    },
  
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#333333",
      borderRadius: 8,
      marginBottom: 16,
    },
    elements: {
      alignItems: "center",
      width: "100%",
    },
    checkBox: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    checkText: {
      color: "white",
      fontSize: 16,
      marginHorizontal: 10,
    },
  
    title: {
      color: "white",
      fontSize: heightPercentage(5),
      textAlign: "left",
      fontWeight: Themes.fonts.extrabold,
      marginBottom: 20,
    },
  
    elements: {
      alignItems: "center",
      marginBottom: 30,
    },
  
    button: {
      marginTop: 20,
      width: "100%",
      borderRadius: 10,
    },
    footer: {
      alignItems: "center",
    },
    checkBox: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    checkText: {
      color: "white",
      fontSize: 16,
      marginHorizontal: 10,
    },
    button: {
      marginBottom: 30,
      width: widthPercentage(84),
    },
    link: {
      flexDirection: "row",
      marginVertical: 15,
    },
    footerText: {
      color: "#9d9d9d",
      marginHorizontal: 10,
    },
    redirectionText: {
      color: "white",
      paddingHorizontal: 10,
    },
  });
  