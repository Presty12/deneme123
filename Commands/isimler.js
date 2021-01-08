const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
module.exports.run = async (client, message, users, args) => {
if(!message.member.roles.cache.some(r => [''].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")

let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.get(args[0]);
var sayi = 1
let data = db.get(`isim.${message.guild.id}`)
let rol = db.fetch(`rol.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed()
    .setColor("0x2f3136")
    .setThumbnail(user.user.avatarURL ({ dynamic: true}))
    .setDescription(`
    ${isim} Kullanıcının isim kaydına rastlanmadı.`)
    .setColor("0x2f3136"))
let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}. \`• ${x.isim} | ${x.yas}\`  (<@&${x.role}>)\n`).join("\n")
if(isimler === null) isimler = "Kullanıcının isim kaydına rastlanmadı."
if(isimler === undefined) isimler = "Kullanıcının isim kaydına rastlanmadı."



const embed = new MessageEmbed()
.setColor('RANDOM')
.setThumbnail(user.user.avatarURL ({ dynamic: true}))
.setAuthor(`Bu Kullanıcı ${sayi-1} Kere Kayıt Olmuş`)
.setDescription(`${isimler}`)
message.channel.send(embed)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isimler'],
  permLevel: 0,
}

exports.help = {
      name: "isimler",
      description: "Etiketlediğiniz kullanıcının isimlerini atar.",
      usage: ".isimler @etiket/ID"

}
