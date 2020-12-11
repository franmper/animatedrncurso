import React, { useRef } from "react";
import { Pressable, StyleSheet, Text, View, PanResponder, Animated, Easing, Button } from "react-native";

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
  const widthSquare = useRef(new Animated.Value(200)).current;
  const heightSquare = widthSquare.interpolate({
    inputRange: [180, 220],
    outputRange: [180, 220],
  });
  const borderWidthAnim = widthSquare.interpolate({
    inputRange: [180, 220],
    outputRange: [2, 15],
  });
  const fontSizeAnim = widthSquare.interpolate({
    inputRange: [180, 220],
    outputRange: [25, 35],
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        Animated.timing(widthSquare, {
          toValue: 220,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }).start();
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();
        Animated.timing(widthSquare, {
          toValue: 180,
          duration: 150,
          easing: Easing.inOut(Easing.ease),
        }).start(() => {
          Animated.timing(widthSquare, {
            toValue: 200,
            duration: 150,
            easing: Easing.inOut(Easing.ease),
          }).start();
        });

        console.log(gestureState);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          width: widthSquare,
          height: heightSquare,
          backgroundColor: "#f72585",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#3a0ca3",
          borderWidth: borderWidthAnim,
          borderRadius: 10,

          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
      >
        <Animated.Text style={{ fontSize: fontSizeAnim, color: "#fff", fontWeight: "bold" }}>Mueveme</Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4895ef",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
