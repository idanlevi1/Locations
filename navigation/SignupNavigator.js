import {createStackNavigator } from 'react-navigation'
import SignupScreen from '../screens/SignupScreen/Signup'
import ImagePickerScreen from '../screens/SignupScreen/ImagePicker'

const SignupRoute = createStackNavigator(
    {
        Signup: SignupScreen,
        ImagePicker: ImagePickerScreen
    },
    {headerMode: 'none'}
);

export default SignupRoute;