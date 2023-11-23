import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class registerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      isValidEmail: true,
      isValidPassword: true,
      userName: "",
    };
  }

  static navigationOptions = {
    title: "Registro",
    headerLeft: () => (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Text style={{ marginLeft: 20, marginRight: 50 }}>Volver</Text>
      </TouchableOpacity>
    ),
  };

  handleGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

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

  handleConfirmPasswordChange = (text) => {
    this.setState({ confirmPassword: text });
    const valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s])\S{8,}$/;
    const isValidPasswordConfirmation = valid.test(text);
    this.setState({ isValidPasswordConfirmation });
  };

  handleUserChange = (text) => {
    this.setState({ userName: text });
    const isValidUser = text.length >= 4;
    this.setState({ isValidUser });
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

    if (!this.state.isValidUser) {
      Alert.alert(
        "Invalid Username",
        "Username must be at least 4 characters long."
      );
      return;
    }

    // Check if passwords match
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please enter the same password in both fields."
      );
      return;
    }

    // Passwords match, proceed with registration
    Alert.alert(
      "Successful Registration",
      "You have been registered successfully!"
    );
    Actions.login();
  };

  /*
  register = () => {
    Actions.login();
  };
  */

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subTitle}>Sign Up to your account</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={this.handleEmailChange}
          value={this.state.email}
          placeholder="Create an email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleUserChange}
          value={this.state.userName}
          placeholder="Username"
          keyboardType="default"
        />
        <TextInput
          placeholder="Create a password"
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
        />
        <TextInput
          placeholder="Confirm password"
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={this.handleConfirmPasswordChange}
          value={this.state.confirmPassword}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.loginButton}
            onPress={this.handleSubmit}
            title="Log In"
            accessibilityLabel="Learn more about this purple button"
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
