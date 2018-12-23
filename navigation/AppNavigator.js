import { createBottomTabNavigator } from 'react-navigation';
import LocationsStack from './stacks/LocationsStack';

export const TabNavigator = () => createBottomTabNavigator({
  Locations: LocationsStack,
  Category: CategoryRoute
},
{
  initialRouteName: "Locations"
});