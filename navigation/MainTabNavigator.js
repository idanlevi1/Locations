import { createBottomTabNavigator } from "react-navigation";
import LocationsStack from "./stacks/LocationsStack";
import CategoriesStack from "./stacks/CategoriesStack";
import {BRANDTS} from '../constants/Colors'
import Layout from '../constants/Layout'
export default (BottomTabNavigator = createBottomTabNavigator(
  {
    Locations: LocationsStack,
    Categories: CategoriesStack
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: BRANDTS.one,
        borderWidth: 2,
        borderColor:BRANDTS.four,
        height: Layout.window.height * 0.1,
        padding:2,
      },
      activeTintColor: BRANDTS.two,
      inactiveTintColor: BRANDTS.three
    }
  }
));
