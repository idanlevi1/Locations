import React from "react";
import Splash from "../screens/SplashScreen/Splash";
import {createRootNavigator} from '../navigation/AppNavigator'
import BottomTabNavigator from '../navigation/MainTabNavigator'
export default class MainApp extends React.Component {
  state = {
    splash: true,
    signedIn: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ splash: false });
    }, 100);
  }

  render() {
    if (this.state.splash) {
      return <Splash />;
    }
    return <BottomTabNavigator/>
  }
}
