
const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../settings.json");
var prefix = ayarlar.prefix;
module.exports = client => {
console.log(`[${moment().format("YYYY-MM-DD")}] BOT: Aktif, Komutlar yüklendi!`);
console.log(`[${moment().format("YYYY-MM-DD")}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);

};
