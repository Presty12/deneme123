const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./settings.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms')
const { parseZone } = require("moment");
const datab = require('quick.db');//
//

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "S'anta Salvador" }, status: "dnd" });
  let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});
var prefix = ayarlar.prefix;//
//

const log = message => {//
    console.log(`${message}`);//
};
client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./Commands/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./Commands/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./Commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);



client.on("guildMemberAdd", member => {
  member.roles.add(ayarlar.unr);
});


client.on("guildMemberAdd", member => {
  member.setNickname(`${ayarlar.tag || ""} İsim | Yaş`);
});



client.on("guildMemberAdd", member=> {
    let sunucu = client.guilds.cache.get(ayarlar.sunucuID);
    let logKanal = sunucu.channels.cache.get(ayarlar.kayıtkanal);
    let kayitSorumlusu = sunucu.roles.cache.get(ayarlar.teyitsorumlusu);
    let kayitSorumlusu2 = sunucu.roles.cache.get(ayarlar.teyitsorumlusu2);
    let kayitSorumlusu3 = sunucu.roles.cache.get(ayarlar.teyitsorumlusu3);
  let emoji = "<a:chiron_tag4:796384808582381578>";

let memberGün = moment(member.user.createdAt).format("DD");
let memberTarih = moment(member.user.createdAt).format("YYYY");
let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");

    if (member.user.bot) {
        member.roles.add(ayarlar.bot);
    }else{
        let durum = Date.now()-member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7
              if (logKanal) logKanal.send(`
${emoji} ${member} adlı üye sunucuya giriş yaptı, seninle toplam **${member.guild.memberCount}** kişiye ulaştık!

  ${emoji} Sunucumuza kayıt olmak için sese girip teyit vermen gerekmektedir.

      ${emoji} Seninle ${kayitSorumlusu}, ${kayitSorumlusu2} ve ${kayitSorumlusu3} ilgilenecektir.

  ${emoji} Hesabın ${memberGün} ${memberAylar} ${memberTarih} tarihinde oluşturulmuştur

${emoji} Bu hesap **${durum ? "Şüpheli <a:olumsuz:795703315177799699>" : "Güvenli <a:olumlu:795703315421855774>"}**
              `);



};


client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = ayarlar.tag
  const sunucu = ayarlar.sunucuID
  const kanal = ayarlar.savelog
  const rol = ayarlar.tagrol

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("0x2f3136").setDescription(`${newUser} Adlı Kullanıcı Tagımızı \`(${tag})\` Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda Tagımızı \`(${tag})\` Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("0x2f3136").setDescription(`${newUser} Adlı Kullanıcı Tagımızı \`(${tag})\` Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda Tagımızı \`(${tag})\` Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});




client.on("guildMemberAdd", member => {
let tag = ayarlar.yasaktag
let kayıtsız = ayarlar.unr
let yasaktag = ayarlar.yasaktagrol
let s = ayarlar.sus
if(member.user.username.includes(tag)){
member.roles.add(yasaktag)
member.roles.remove(kayıtsız)
member.roles.remove(s)
member.send(`${member.guild.name} adlı sunucumuzda yasaklı taglardan birini adında bulunduruyorsun. Yasaklı tagı çıkarmadığın sürece \`Yasaklıtag\` rolünde kalacaksın.`)
}


  client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(14, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
  const kytsz = member.guild.roles.cache.find(r => r.id === "KAYTSIZROLID")
   var rol = member.guild.roles.cache.get("ŞÜPHELİROLID")
   var kayıtsız = member.guild.roles.cache.get(kytsz)
   const kanal = member.guild.channels.cache.find(r => r.id === "KANALID");
   member.roles.add(rol)
   member.roles.remove(kytsz)

member.user.send('Hesabınız 2 hafta önce açıldığından dolayı cezalıya atıldınız.')
kanal.send(`${member.user} sunucuya giriş yaptı ama hesabı 2 hafta önce açıldığı için şüpheliye atıldı.`)
setTimeout(() => {

}, 1000)


   }
        else {

        }
    });


})





Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();

    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

    if (!format) {
      format = "dd MM yyyy | hh:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);

    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };

    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);

    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("hh") > -1) {
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    };
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };
});
