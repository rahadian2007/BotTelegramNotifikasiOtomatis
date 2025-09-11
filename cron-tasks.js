const axios = require("axios");

const BOT_TOKEN = "123456789:ABC-your-bot-token"; 
const CHAT_ID = "987654321";

// Array jadwal notifikasi
const schedules = [
  {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"], // Senin–Jumat
    time: "09:00",
    message: "Selamat pagi! ☀️",
  },
  {
    days: ["Sat", "Sun"], // Sabtu–Minggu
    time: "10:00",
    message: "Selamat pagi weekend! 🌞",
  },
  {
    days: ["Mon", "Wed", "Fri"],
    time: "17:00",
    message: "Selamat sore! 🌆",
  },
];

// Fungsi bantu untuk ubah hari dan jam ke format cron
const dayMap = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

module.exports = () => {
  const cronJobs = {};

  schedules.forEach((sched) => {
    const [hour, minute] = sched.time.split(":");
    const daysCron = sched.days.map((d) => dayMap[d]).join(",");
    const cronKey = `${minute} ${hour} * * ${daysCron}`; // format cron: m h * * day-of-week

    cronJobs[cronKey] = async () => {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: sched.message,
      });
    };
  });

  return cronJobs;
};
