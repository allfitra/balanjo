import { Dimensions, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { LinearGradient } from "expo-linear-gradient";

export default function HistoryScreen() {
  return (
    <ParallaxScrollView backgroundColor={{ light: "#fff", dark: "#000" }}>
      <LinearGradient
        colors={["#0f1f49", "#2997beff", "transparent"]}
        style={styles.headerShape}
      >

      </LinearGradient>
    </ParallaxScrollView>
  );
}

const { height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  headerShape: {
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
