import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { Actions } from "react-native-router-flux";

export default class ArtistDetailView extends Component {
  static navigationOptions = {
    title: "",
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

  render() {
    const { image, name, listeners, stremeable, id } = this.props.artist;
    return (
      <View style={styles.centeredView}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.centeredView}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.listeners}>{listeners} oyentes mensuales</Text>
          <Text style={styles.stremeable}>
            {stremeable ? "SI" : "NO STREMEABLE"}
          </Text>
          <Text style={styles.id}>ID: {id}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 25,
  },
  name: {
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 10,
  },
  listeners: {
    fontSize: 18,
    color: "#999",
    marginTop: 10,
  },
  stremeable: {
    fontSize: 17,
    color: "#666",
    marginTop: 10,
  },
  id: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },
});
