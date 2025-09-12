// Lokasi: ./config/server.js
// Konfigurasi server Strapi v5, termasuk cron jobs

const cronTasks = require("./cron-tasks"); // <- lokasi file cron-tasks.js

export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  cron: {
    enabled: true,
    tasks: cronTasks(), // Memanggil fungsi cron-tasks.js
  },
});
