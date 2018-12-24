import React from "react";
import { AppLoading, Asset, Font, Icon } from "expo";
import MainApp from "./components/MainApp";
import { Provider } from "react-redux";
import configureStore from './store/createStore';
import { PersistGate } from 'redux-persist/integration/react';
import { AsyncStorage } from "react-native"

const { persistor, store } = configureStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    // persistor.purge() //Delete all asyncStorage
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainApp/>
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
