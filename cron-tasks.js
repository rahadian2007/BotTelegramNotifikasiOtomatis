// 📂 Lokasi file: ./config/cron-tasks.js
// File ini dipakai Strapi untuk mendefinisikan cron job (tugas terjadwal otomatis)

const axios = require("axios");

module.exports = {
  // ⏰ Cron job pertama: jalan setiap hari jam 09:00 pagi
  "0 9 * * *": async () => {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: "Selamat pagi! ☀️",
    });
  },

  // ⏰ Cron job kedua: jalan setiap hari jam 17:00 sore
  "0 17 * * *": async () => {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: "Selamat sore! 🌆",
    });
  },
};
