const { Discord, MessageEmbed } = require('discord.js');
const db = require('quick.db');
exports.run = async(client, message, args) => {
if(!["", ""].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsin.')).then(x => x.delete({timeout: 10000}));
  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(' ').toLowerCase())).first(): message.author) || message.author;
  let uye = message.guild.member(kullanici);
if(!uye) {

let erkek = db.fetch(`yetkili.${message.author.id}.erkek`)
let kadın = db.fetch(`yetkili.${message.author.id}.kadın`)
let toplam = db.fetch(`yetkili.${message.author.id}.toplam`)
if(erkek === null) erkek = "0"
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(toplam === null) toplam = "0"
if(toplam === undefined) toplam = "0"
const embed = new MessageEmbed()
.setColor('RANDOM')
.setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
.setDescription(`
Toplamda ${toplam} adet teyitin var(\`${erkek}\` adet erkek, \`${kadın}\` adet kadın.)`)
.setFooter('Başka yetkililerin kayıt istatistiklerine bakmak için .teyitsay!')
}

if(!uye) {

let erkekk = db.fetch(`yetkili.${uye.id}.erkek`)
let kadınn = db.fetch(`yetkili.${uye.id}.kadın`)
let toplamm = db.fetch(`yetkili.${uye.id}.toplam`)
if(erkekk === null) erkekk = "0"
if(erkekk === undefined) erkekk = "0"
if(kadınn === null) kadınn = "0"
if(kadınn === undefined) kadınn = "0"
if(toplamm === null) toplamm = "0"
if(toplamm === undefined) toplamm = "0"
const embed = new MessageEmbed()
.setColor('RANDOM')
.setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
.setDescription(`
<@${uye.id}> Yetkilinin toplamda ${toplamm} adet teyiti var(\`${erkekk}\` adet erkek, \`${kadınn}\` adet kadın.)`)
.setFooter('Başka yetkililerin kayıt istatistiklerine bakmak için .teyitsay!')

}
}

exports.conf = {
enabled: true,
guildOnly: true,
alieses: ['teyitsay'],
permlevel: 0

}

exports.help = {
name: "teyitsay",
description: "yetkililerin teyit istatistiklerini görmenizi sağlar",
usage: ".teyitsay @etiket/ID"
}
