import { StyleSheet, Text, TextInput, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { getNextPrayerTime } from "@/components/utils/getNextPrayerTime";
import { Colors } from "@/constants/Colors";
import { getDateHijriyah, getPraytime } from "@/utils/quranFetchApi";
import { postData } from "@/utils/supabaseFetchApi";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

type Transaction = {
  type: string;
  price?: number;
  desc: string;
  source: string;
};

type MuslimDateTime = {
  hijriyahDate: string;
  location: string;
  jadwal: object;
};

type NextPrayer = {
  name: string;
  time: string;
};

const days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const locationList = [
  "jakarta",
  "bekasi",
  "kabBekasi",
  "depok",
  "padang",
  "pariaman",
  "painan",
];

const myLocationCode = {
  jakarta: "1301",
  bekasi: "1221",
  kabBekasi: "1203",
  depok: "1225",
  padang: "0314",
  pariaman: "0306",
  painan: "0308",
};

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [nextPrayer, setNextPrayer] = useState<NextPrayer>({
    name: "",
    time: "",
  });
  const [muslimDateTime, setMuslimDateTime] = useState<MuslimDateTime>({
    hijriyahDate: "",
    location: "",
    jadwal: {},
  });
  const [transaction, setTransaction] = useState<Transaction>({
    type: "",
    price: undefined as number | undefined,
    desc: "",
    source: "",
  });
  const [priceInput, setPriceInput] = useState("");

  const onChangePrice = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");

    if (numericValue) {
      const formatted = new Intl.NumberFormat("id-ID").format(
        Number(numericValue)
      );
      setPriceInput(formatted);
      setTransaction({ ...transaction, price: Number(numericValue) });
    } else {
      setPriceInput("");
    }
  };

  const postTransaction = async (data: Transaction) => {
    if (!data.type || data.price === undefined || !data.desc) {
      alert("Please fill in all fields.");
      console.log("Validation failed:", data);
      return;
    }

    try {
      const { data, error } = await postData("money_management", transaction);

      if (error) {
        console.error("Insert error:", error.message);
        alert("Failed to save transaction. ❌");
        return;
      }

      alert("Transaction saved successfully! ✅");
      setTransaction({ type: "", price: undefined, desc: "", source: "" });
      setPriceInput("");
    } catch (error) {
      console.error("Error posting transaction:", error);
      alert("An error occurred while saving. ❌");
    }
  };

  useEffect(() => {
    const intervalId: number = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getDateHijriyah()
      .then((data) => {
        setMuslimDateTime((prev) => ({
          ...prev,
          hijriyahDate: data.date[1],
        }));
      })
      .catch((err) => console.error("Error:", err));

    getPraytime(myLocationCode.bekasi)
      .then((data) => {
        setMuslimDateTime((prev) => ({
          ...prev,
          location: data.lokasi,
          jadwal: data.jadwal,
        }));
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    if (muslimDateTime?.jadwal) {
      const resp = getNextPrayerTime(muslimDateTime);
      setNextPrayer(resp);
    }
  }, [muslimDateTime]);

  // console.log(nextPrayer);

  // console.log("DATAA", muslimDateTime);

  const currentDateTime = {
    day: `${days[currentTime.getDay()]}`,
    date: `${days[currentTime.getDay()]}, ${String(
      currentTime.getDate()
    ).padStart(2, "0")} ${
      months[currentTime.getMonth()]
    } ${currentTime.getFullYear()}`,
    hour: String(currentTime.getHours()).padStart(2, "0"),
    minute: String(currentTime.getMinutes()).padStart(2, "0"),
  };

  return (
    <ParallaxScrollView backgroundColor={{ light: "#fff", dark: "#000" }}>
      <LinearGradient
        colors={[Colors.secondary, Colors.primary, "transparent"]}
        style={styles.headerShape}
      >
        <View style={styles.timeDateContainer}>
          <Text style={{ fontSize: 14, fontWeight: 500 }}>
            {currentDateTime.date}
          </Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeBox}>{currentDateTime.hour}</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.timeBox}>{currentDateTime.minute}</Text>
          </View>
        </View>
        <View style={styles.muslimTimeContainer}>
          <View style={{ flexDirection: "column", gap: 3 }}>
            <Text style={{ fontSize: 16, fontWeight: 700 }}>
              {nextPrayer?.name}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 700 }}>{nextPrayer.time}</Text>
          </View>
          <View style={{ flexDirection: "column", gap: 5 }}>
            <Text style={{ fontSize: 14, fontWeight: 500 }}>
              {muslimDateTime.hijriyahDate}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 500, color: "#666" }}>
              <Entypo name="location" size={16} />
              <Text> </Text>
              <Text>{muslimDateTime.location}</Text>
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.priceContainer}>
            <View style={styles.prefixBox}>
              <Text style={styles.prefixText}>Rp</Text>
            </View>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              placeholder="Harga"
              value={priceInput}
              onChangeText={onChangePrice}
            />
          </View>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Keterangan"
            multiline={true}
            value={transaction.desc}
            onChangeText={(text) =>
              setTransaction({ ...transaction, desc: text })
            }
          />
        </View>
        <View style={styles.buttonInputContainer}>
          <ThemedButton
            title="Pemasukan"
            onPress={() => {
              setTransaction({ ...transaction, type: "income" });
            }}
            style={{
              backgroundColor:
                transaction.type === "expense" ? "#9f9f9fff" : "#3cd341ff",
            }}
            textStyle={{
              textDecorationLine:
                transaction.type === "expense" ? "line-through" : "none",
            }}
          />
          <ThemedButton
            title="Pengeluaran"
            onPress={() => {
              setTransaction({ ...transaction, type: "expense" });
            }}
            style={{
              backgroundColor:
                transaction.type === "income" ? "#9f9f9fff" : "#da3535ff",
            }}
            textStyle={{
              textDecorationLine:
                transaction.type === "income" ? "line-through" : "none",
            }}
          />
        </View>
        <ThemedButton
          title="Simpan"
          onPress={() => postTransaction(transaction)}
          style={{ backgroundColor: "#10befb" }}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerShape: {
    paddingHorizontal: 32,
    paddingTop: 20,
    height: 320,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
  timeDateContainer: {
    backgroundColor: "#fcfcfcfc",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    paddingVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 20,
    gap: 5,

    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // elevasi for Android
    elevation: 5,
  },
  timeContainer: {
    flexDirection: "row",
    gap: 5,
  },
  timeBox: {
    backgroundColor: "#61bcddff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  separator: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  muslimTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 80,
    justifyContent: "space-between",
    backgroundColor: "#fcfcfcfc",
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  headerShapeBottom: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 32,
    marginTop: -60,
  },
  inputContainer: {
    flexDirection: "column",
    gap: 25,
    marginBottom: 5,
  },
  buttonInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  priceInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  prefixBox: {
    backgroundColor: "#d7d7d7ff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  prefixText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
