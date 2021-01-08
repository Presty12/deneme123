const { Discord, MessageEmbed } = require('discord.js');
const qd = require('quick.db');
const ayar = require('../settings.json');
exports.run = async(client, message, args) => {
 if(!["", ""].some(roles => message.members.roles.cache.get(roles)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Bu komudu kullanmak için gerekli izin(yetki)lere sahip değilsin.')).then(x => x.delete({ timeout: 10000 }));
 let kadınrol = ayar.kadın
 //let kadınrol2 = ayar.kadın2
 let kayıtsız = ayar.unr
 let log = ayar.savelog
 let tag = ayar.tag
 let kayıtkanal = ayar.kayıtkanal
   let sus = ayar.sus

 let kullanıcı = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
 let member = message.guild.member(kullanıcı);
 if(member.id === message.guild.OwnerID) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Sunucu sahibini kayıp edemezsiniz.')).then(x => x.delete({ timeout: 10000 }));
 if(member.id === message.author.id) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Kendini kayıt edemezsin.')).then(x => x.delete({ timeout: 10000 }));
 if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Bu kullanıcının rolleri sizden üst veya aynıdır. Bu kullanıcıyı kayıt edemezsiniz.')).then(x => x.delete({ timeout: 10000 }));
 if(member.id === client.user.id) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Botu kayıt edemezsiniz.')).then(x => x.delete({ timeout: 10000 }));

 if(!["", "", "", ""].some(role => message.members.cache.get(role))) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Bu kullanıcı zaten kayıt edilmiş!')).then(x => x.delete({ timeout: 10000 }));
if(message.member.roles.cache.has(sus)) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Dostum bu adam şüpheli kör müsün:D?')).then(x => x.delete({ timeout: 10000 }));

if (member.user.username.includes(tag)) {
  member.roles.add(ayar.tagrol);
} 
let name = args[1];
if(!name) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Lütfen bir isim girin.')).then(x => x.delete({ timeout: 10000 }));
if(name.length > 17) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Karakter sayısı 1-17 arası olabilir.')).then(x => x.delete({ timeout: 10000 }));
let age = Number(args[2]);
if(!age) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Lütfen bir yaş girin. (Sadece sayı değeri girilebilir.)')).then(x => x.delete({ timeout: 10000 }));
if(age.length > 100) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription("Girdiğiniz yaş değeri 100'den büyük olamaz.")).then(x => x.delete({ timeout: 10000 }));


qd.add(`yetkili.${message.author.id}.kadın`, 1)
qd.add(`yetkili.${message.author.id}.toplam`, 1)

member.roles.add(kadınrol)
//member.roles.add(kadınrol2)
member.roles.remove(kayıtsız)
member.setNickname(`${tag} ${name} | ${age}`)

var sayi = 1
if(sayi === null) sayi = "İsim kaydı bulunamadı"
if(sayi === undefined) sayi = "İsim kaydı bulunamadı"
let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}. \`• ${x.isim} | ${x.yas}\`  (<@&${x.role}>)\n`).join("\n")
if(isimler === null) isimler = "Kullanıcının isim kaydı bulunmadı."
if(isimler === undefined) isimler = "Kullanıcının isim kaydı bulunmadı."

const embed = new MessageEmbed()
.setColor('PURPLE')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
  ${member} kullanıcı başarıyla ${kadınrol} olarak kayıt edildi.
  Kullanıcının toplam \`${sayı-1}\` adet isimle kayıt olmuş;

  ${isimler}`)
  .setFooter('Üyenin daha önce kayıt olduğu isimlere .isimler @etiket bakarak kayıt işlemini gerçekleştirmeniz önerilir!')
kayıtkanal.send(embed).then(x => x.delete({ timeout: 10000 }));

const embed2 = new MessageEmbed()
.setColor('PURPLE')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
  ${member} kullanıcı başarıyla ${kadınrol} olarak kayıt edildi.
  Kayıt eden yetkili : ${message.author}
  Kullanıcının toplam \`${sayı-1}\` adet isimle kayıt olmuş;

  ${isimler}`)
  .setFooter('Üyenin daha önce kayıt olduğu isimlere .isimler @etiket bakarak kayıt işlemini gerçekleştirmeniz önerilir!')
  log.send(embed2)

  qd.push(`isim.${message.guild.id}`, {
userID: member.id,
isim: name,
yas: age,
role: kadınrol.id,
tag: tag
})

 }


exports.conf = {
enabled: true,
guildOnly: true,
alieses: ["k", "kadın", "kız"],
permlevel: 0
}

exports.help = {
name: "kadın",
description: "Kullanıcıyı kadın olarak kayıt eder.",
usage: ".k @etiket/ID İsim Yaş"
}
