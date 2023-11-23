import React, { Component } from "react";
import LoginView from "./src/LoginView";
import registerView from "./src/registerView";
import HomeView from "./src/HomeView";
import ArtistDetailView from "./src/ArtistDetailView";
import { Actions, Scene, Router } from "react-native-router-flux";

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={LoginView} title="Login" hideNavBar />
    <Scene key="register" component={registerView} title="Register" />
    <Scene key="home" component={HomeView} title="Home" hideNavBar />
    <Scene
      key="artist"
      component={ArtistDetailView}
      title="ArtistDetail"
      hideNavBar
    />
  </Scene>
);

export default class App extends Component {
  render() {
    return <Router scenes={scenes} />;
  }
}
