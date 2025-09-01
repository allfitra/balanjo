const prayerDisplayNames: Record<string, string> = {
  subuh: "Subuh",
  dzuhur: "Dzuhur",
  ashar: "Ashar",
  maghrib: "Maghrib",
  isya: "Isya",
};

export function getNextPrayerTime(muslimDateTime: any) {
  const now = new Date();

  // daftar urutan waktu sholat (biar konsisten)
  const prayerOrder = [
    "subuh",
    "dzuhur",
    "ashar",
    "maghrib",
    "isya",
  ];

  for (let prayer of prayerOrder) {

    const timeStr = muslimDateTime.jadwal[prayer];
    if (!timeStr) continue;

    // bikin objek Date utk hari ini
    const [hour, minute] = timeStr.split(":").map(Number);
    const prayerTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute
    );

    if (prayerTime > now) {
       return {
        name: prayerDisplayNames[prayer] ?? prayer,
        time: timeStr,
      };
    }
  }

  // kalau semua sudah lewat → balik ke imsak besok
  return { name: "subuh", time: muslimDateTime.jadwal["subuh"] };
}
