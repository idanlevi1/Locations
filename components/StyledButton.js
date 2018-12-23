import React from "react";
import { TouchableOpacity } from "react-native";
import { MonoText } from '../components/StyledText';

export class ButtonMono extends React.Component {
  render() {
    const { _backgroundColor, _color, _fontSize, _text, onClick, _padding } = this.props;
    return (
      <TouchableOpacity
        onPress={onClick}
        {...this.props}
        style={[
          this.props.style,
          {
            alignItems: "center",
            backgroundColor: _backgroundColor,
            padding: _padding || 10,
            borderWidth: 2,
            borderColor: _color,
            borderRadius: 10
          }
        ]}
      >
        <MonoText style={{ color: _color, fontSize: _fontSize }}>
          {_text}
        </MonoText>
      </TouchableOpacity>
    );
  }
}
