import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import AppNavigator from "../../navigation/AppNavigator";
import { QED_Group } from "../constants/Colors";

export default class MainAppNavigator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: QED_Group.one
  }
});
