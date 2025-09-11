const axios = require("axios");

const BOT_TOKEN = "123456789:ABC-your-bot-token"; 
const CHAT_ID = "987654321";

module.exports = {
  "0 9 * * *": async () => { // jam 09:00
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: "Selamat pagi! ☀️",
    });
  },
  "0 17 * * *": async () => { // jam 17:00
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: "Selamat sore! 🌆",
    });
  },
};
