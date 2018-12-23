import React from 'react';
import { TextInput } from 'react-native';

export class TextInputMono extends React.Component {
  render() {
    return <TextInput 
    {...this.props} 
    style={[this.props.style, { fontFamily: 'space-mono' }]}
    underlineColorAndroid={'transparent'}
    />;
  }
}
