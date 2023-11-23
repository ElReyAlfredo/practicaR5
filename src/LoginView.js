import { StatusBar } from "expo-status-bar";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class loginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isValidEmail: true,
      isValidPassword: true,
    };
  }

  handleEmailChange = (text) => {
    this.setState({ email: text });
    const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = regex.test(text);
    this.setState({ isValidEmail });
  };

  handlePasswordChange = (text) => {
    this.setState({ password: text });
    const valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s])\S{8,}$/;
    const isValidPassword = valid.test(text);
    this.setState({ isValidPassword });
  };

  handleSubmit = () => {
    const isEmailEmpty = this.state.email === "";
    const isPasswordEmpty = this.state.password === "";

    if (isEmailEmpty) {
      Alert.alert("Empty Email", "Please enter your email address.");
      return;
    }

    if (isPasswordEmpty) {
      Alert.alert("Empty Password", "Please enter your password.");
      return;
    }

    if (!this.state.isValidEmail) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!this.state.isValidPassword) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters long, contain at least one digit, one uppercase letter, and one special character."
      );
      return;
    }

    Alert.alert("Successful Login", "You have been logged in successfully!");
    Actions.home();
  };

  register = () => {
    Actions.register();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("./assets/p1.jpg")}></Image>
        <Text style={styles.subTitle}>Sign In to your account</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleEmailChange}
          value={this.state.email}
          placeholder="email"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="password"
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.loginButton}
            onPress={this.handleSubmit}
            title="Log In"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.loginButtonbutton}
            onPress={this.register}
            title="Crear una cuenta"
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200, // Ancho deseado
    height: 100, // Alto deseado
  },
  errorText: {
    color: "#A93226",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    color: "gray",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: "80%",
    marginTop: 20,
    borderRadius: 30,
  },
  buttonContainer: {
    marginTop: 20,
    width: "50%",
  },
  loginButton: {
    width: "100%", // Establece la anchura del botón
  },
});
