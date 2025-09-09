import * as Location from "expo-location";
import { getCityFromLatLng } from "./getCityFromLatLng";

export async function getCurrentLocation() {
  try {
    // Minta izin lokasi
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Izin lokasi ditolak");
    }

    // Ambil koordinat saat ini
    const loc = await Location.getCurrentPositionAsync({});

    // Panggil helper untuk reverse geocode via Nominatim
    const response = await getCityFromLatLng(
      loc.coords.latitude,
      loc.coords.longitude
      // -6.5407,
      // 107.4463
    );

    if (!response || !response.data) {
      return [];
    }

    // Pastikan ada data address
    const addr = response?.data || {};

    // Kembalikan object tunggal yang lebih ringkas
    return {
      city: addr.city || addr.county || addr.regency || null,
      region: addr.state || null,
      country: addr.country || null,
    };
  } catch (error) {
    console.error("❌ Error getCurrentAddress:", error);
    return [];
  }
}
