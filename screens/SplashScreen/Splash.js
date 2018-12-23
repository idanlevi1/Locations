import React from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import {createAnimation, createInterpolate} from '../../components/Animation'
import { BRANDTS } from "../../constants/Colors";
import { MonoText } from "../../components/StyledText";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0.25),
      yValueTitle: new Animated.Value(0),
      xValueSubtitle: new Animated.Value(0),
      spinAnim: new Animated.Value(0.65),
    };
    this.playAnimations();
  }

  playAnimations = () => {
    Animated.parallel([
        createAnimation(this.state.opacity, 1, 500, Easing.ease),
        createAnimation(this.state.spinAnim, 1, 1000, Easing.ease, 500, false),
        createAnimation(this.state.yValueTitle, 1, 1200, Easing.cubic, 300, false),
        createAnimation(this.state.xValueSubtitle, 1, 1000, Easing.linear, 300, false),
    ]).start()
  }

  render() {
    const { spinAnim, yValueTitle, xValueSubtitle } = this.state;
    const spinSubtitle = createInterpolate(spinAnim,[0, 1],['540deg','360deg']);
    const spinTitle = createInterpolate(spinAnim,[0, 1],['0deg','352deg']);
    const yTitleFall = createInterpolate(yValueTitle,[0, 1],['-65%','0%']);
    const xSubtitleFall = createInterpolate(xValueSubtitle,[0, 1],['65%','0%']);

    return (
      <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
        <Animated.View style={{top: yTitleFall, transform: [{rotate: spinTitle}]}}>
            <MonoText style={styles.title}>MyLocations</MonoText>
        </Animated.View>
        <Animated.View style={{left: xSubtitleFall, transform: [{rotate: spinSubtitle}]}}>
            <MonoText style={styles.subtitle}>Welldone</MonoText>
        </Animated.View>
    </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRANDTS.two,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 52,
    color: BRANDTS.three,
    fontWeight: "500"
  },
  subtitle: {
    fontSize: 26,
    color: BRANDTS.one
  }
});
