import React from "react";
import Splash from "../screens/SplashScreen/Splash";
import BottomTabNavigator from '../navigation/MainTabNavigator'

export default class MainApp extends React.Component {
  state = {
    splash: true,
    signedIn: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ splash: false });
    }, 2500);
  }

  render() {
    if (this.state.splash) {
      return <Splash />;
    }
    return <BottomTabNavigator/>
  }
}
