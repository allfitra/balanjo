import axios from "axios";

const API_URL = "https://nominatim.openstreetmap.org/reverse";

export async function getCityFromLatLng(lat: number, lon: number) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        format: "json",
        lat,
        lon,
      },
      headers: {
        "User-Agent": "Balanjo/1.0 (alfitrafadjri2377@gmail.com)",
      },
    });

    const data = response.data.address;
    return {
      data,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}
