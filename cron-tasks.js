// Lokasi: ./config/cron-tasks.js
const axios = require("axios");

// Ganti dengan token dan chat_id Telegram kamu
const BOT_TOKEN = "123456789:ABC-your-bot-token";
const CHAT_ID = "987654321";

// Daftar jadwal notifikasi
const schedules = [
  { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], time: "09:00", message: "Selamat pagi! ☀️" },
  { days: ["Sat", "Sun"], time: "10:00", message: "Selamat pagi weekend! 🌞" },
  { days: ["Mon", "Wed", "Fri"], time: "17:00", message: "Selamat sore! 🌆" },
];

// Mapping hari ke angka cron
const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

// Fungsi utama yang diekspor
module.exports = () => {
  const cronJobs = {};

  schedules.forEach((sched) => {
    const [hour, minute] = sched.time.split(":");
    const daysCron = sched.days.map((d) => dayMap[d]).join(",");

    // Format cron: m h * * day-of-week
    const cronKey = `${minute} ${hour} * * ${daysCron}`;

    cronJobs[cronKey] = async () => {
      try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          chat_id: CHAT_ID,
          text: sched.message,
        });
        console.log(`Notif terkirim: ${sched.message}`);
      } catch (err) {
        console.error("Gagal mengirim notif Telegram:", err.message);
      }
    };
  });

  return cronJobs;
};
