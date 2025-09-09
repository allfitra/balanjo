import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SummaryTransactionProps = {
  type: String;
  transaction: number;
};

export const SummaryTransaction: React.FC<SummaryTransactionProps> = ({
  type,
  transaction,
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#666",
          fontSize: 13,
          fontWeight: "600",
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        Total {type}
      </Text>
      <View style={styles.shape}>
        <Text
          style={{
            color: "#000",
            fontSize: 14,
            fontWeight: "600",
            marginRight: 4,
          }}
        >
          Rp
        </Text>
        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
          {transaction.toLocaleString("id-ID")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  shape: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
