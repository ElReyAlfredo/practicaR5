import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import ArtistList from "./ArtistList";
import { getMusicData } from "./api-client";
import { Actions } from "react-native-router-flux";

export default class HomeView extends Component {
  static navigationOptions = {
    title: "",
    headerLeft: () => (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Text style={{ marginLeft: 20, marginRight: 50 }}>Log Out</Text>
      </TouchableOpacity>
    ),
  };

  handleGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  state = {
    artists: null,
  };

  componentDidMount() {
    getMusicData().then((data) => this.setState({ artists: data }));
  }

  render() {
    const artists = this.state.artists;

    return (
      <View style={styles.container}>
        {artists && <ArtistList artists={artists} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
});
