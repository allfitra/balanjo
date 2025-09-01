import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

type Transaction = {
  type: string;
  price?: number;
  desc: string;
  source: string;
};

export default function HistoryScreen() {
  const [transaction, setTransaction] = useState<Transaction>({
    type: "",
    price: undefined as number | undefined,
    desc: "",
    source: "",
  });

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0f1f49", "#2997beff", "transparent"]}
        style={styles.headerShape}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerShape: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
  },
});
