import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import CategoriosScreen from "../../screens/CategoriesScreen/Categories";
import TabBarIcon from "../../components/TabBarIcon";

export default (CategoriesStack = createStackNavigator(
  {
    Categorios: CategoriosScreen
  },
));

CategoriesStack.navigationOptions = {
  tabBarLabel: "Categories",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-list" : "md-list"}
    />
  )
};
