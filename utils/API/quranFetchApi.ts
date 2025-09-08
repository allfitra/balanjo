import axios from "axios";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};
const BASE_URL = extra.apiMyquranUrl || process.env.EXPO_PUBLIC_API_MYQURAN_URL;

export async function getDateHijriyah() {
  try {
    const res = await axios.get(`${BASE_URL}/cal/hijr`);
    return res.data.data;
  } catch (err) {
    console.error("Error getDateHijriyah:", err);
    throw err;
  }
}

export async function getPraytime(idCity: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  try {
    const res = await axios.get(`${BASE_URL}/sholat/jadwal/${idCity}/${today}`);
    return res.data.data;
  } catch (err) {
    console.error("Error getPraytime:", err);
    throw err;
  }
}

export async function getCityId(city: string) {
  try {
    let formattedCity = city.toUpperCase().trim();
    if (formattedCity.startsWith("KAB ")) {
      formattedCity = formattedCity.replace("KAB ", "KAB. ");
    }

    const res = await axios.get(
      `${BASE_URL}/sholat/kota/cari/${formattedCity}`
    );
    return res.data.data;
  } catch (err) {
    console.error("Error getPraytime:", err);
    throw err;
  }
}
