import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import LocationsScreen from "../../screens/LocationsScreen/Locations";
import TabBarIcon from "../../components/TabBarIcon";

export default (LocationsStack = createStackNavigator(
  {
    Locations: LocationsScreen
  },
));

LocationsStack.navigationOptions = {
  tabBarLabel: "Locations",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-locate" : "md-locate"}
    />
  )
};
