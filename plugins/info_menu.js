//Credits Jangan Dihapus
// MADE BY BOCHILGAMING
// RECODE BY ZEN - ig: @yanz_5008

import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'

let tags = {
  'sticker': 'STICKER',
  'group': 'GROUP',
  'downloader': 'DOWNLOADER',
  'internet': 'INTERNET',
  'game': 'GAME',
  'rpg': 'RPG GAMES',
  'fun': 'FUN',
  'quotes': 'QUOTES',
  'tools': 'TOOLS',
  'anime': 'ANIME',
  'nsfw': 'NSFW 18+',
  'maker': 'NULIS & LOGO',
  'anonymous': 'ANONYMOUS',
  'quran': 'Al Quran',
  'xp': 'EXP & LIMIT',
  'info': 'INFO',
  'owner': 'OWNER',
  'virus': 'Bug & Virus',
}

const defaultMenu = {before: `➫ Hay👋🏻, %ucpn kak %name

INFO PENGGUNA:
• Nama: %name
• Tag: %tag
• Status: %prems
• Limit: %limit
• Uang: %money
• Pangkat: %role
• Level: %level [%xp4levelup Xp >> Levelup]
• Xp: %exp / %maxexp
• Total Xp: %totalexp

Bot Sudah Aktif Selama:
• %muptime

Total Terdaftar 1%rtotalreg Pengguna

`.trimStart(),
  header: '%cc %category %c1',
  body: '%c2 %cmd %isPremium %islimit',
  footer: '%c3',
  after: `%c4`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
  try {

  	// DEFAULT MENU
  	let m1 = global.dmenut
      let m2 = global.dmenub
      let m3 = global.dmenuf
      let m4 = global.dmenub2
      
      // COMMAND MENU
      let cc = global.cmenut
      let c1 = global.cmenuh
      let c2 = global.cmenub
      let c3 = global.cmenuf
      let c4 = global.cmenua
      
      // LOGO L P
      let lprem = global.lopr
      let llim = global.lolm
      
        	/*********************** TAGS ************************/
 let tag = `@${m.sender.split('@')[0]}`
 m, { contextInfo: { mentionedJid: conn.parseMention(tag) }}
 let waofc = `@${'0'.split('@')[0]}`
 m, { contextInfo: { mentionedJid: conn.parseMention(tag) }}
 let creator = `@${'62895323263219'.split('@')[0]}`
 m, { contextInfo: { mentionedJid: conn.parseMention(tag) }}
 let creator2 = `@${'6285752235008'.split('@')[0]}`
 m, { contextInfo: { mentionedJid: conn.parseMention(tag) }}
 let lalabot = `@${'62895323263224'.split('@')[0]}`
  	
 /**************************** TIME *********************/
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
 
    let mode = global.opts['self'] ? 'Private' : 'Publik'
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { age, exp, limit, level, role, registered, money} = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium': 'Gratisan'}`
    let platform = os.platform()
    
    //-----------TIME---------
    let ucpn = `${ucapan()}`
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockStringP(_muptime)
    let uptime = clockString(_uptime)
    //---------------------
    
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
          }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%_p' + help)
                .replace(/%islimit/g, menu.limit ? llim : '')
                .replace(/%isPremium/g, menu.premium ? lprem : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      tag, m1,m1,m2,m3,m4,cc, c1, c2, c3, c4,lprem,llim,
      ucpn,platform, wib, mode, _p, money, age, tag, name, prems, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    //----------------- FAKE
    let ftoko = {
    key: {
    fromMe: false,
    participant: `${m.sender.split`@`[0]}` + '@s.whatsapp.net',
    remoteJid: 'status@broadcast',
  },
  message: {
  "productMessage": {
  "product": {
  "productImage":{
  "mimetype": "image/jpeg",
  "jpegThumbnail": fs.readFileSync('./thumbnail.jpg'),
    },
  "title": `${ucapan()}`,
  "description": '𝗧 𝗜 𝗠 𝗘 : ' + wktuwib,
  "currencyCode": "US",
  "priceAmount1000": "100",
  "retailerId": wm,
  "productImageCount": 999
        },
  "businessOwnerJid": `${m.sender.split`@`[0]}@s.whatsapp.net`
  }
  }
  }
  let fgif = {
    key: {
    remoteJid: 'status@broadcast',
    participant : '0@s.whatsapp.net'},
    message: { 
                  "videoMessage": { 
                  "title": wm,
                  "h": `Nekohime`,
                  'duration': '99999999', 
                  'gifPlayback': 'true', 
                  'caption': bottime,
                  'jpegThumbnail': thumb
                         }
                        }
                     }
  let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  
  const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
    
    //------------------< MENU >----------------\\
    
    //------------------ DOCUMENT
    let d1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    let d2 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    let d3  = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    let d4 = 'application/pdf'
    let d5 = 'text/rtf'
    let td = `${pickRandom([d1,d2,d3,d4,d5])}`
    
    //------- BUTTON DOC WITH EXTERNAL ADS------\\
    const _0x46ff84=_0x59ba;(function(_0x4fc4ea,_0x4b6cc8){const _0x30e741=_0x59ba,_0x53cf1f=_0x4fc4ea();while(!![]){try{const _0xf49d11=parseInt(_0x30e741(0x1c1))/0x1*(parseInt(_0x30e741(0x1d6))/0x2)+-parseInt(_0x30e741(0x1c8))/0x3*(-parseInt(_0x30e741(0x1b8))/0x4)+parseInt(_0x30e741(0x1cb))/0x5*(-parseInt(_0x30e741(0x1b9))/0x6)+-parseInt(_0x30e741(0x1c5))/0x7+-parseInt(_0x30e741(0x1d9))/0x8*(-parseInt(_0x30e741(0x1b7))/0x9)+-parseInt(_0x30e741(0x1be))/0xa+parseInt(_0x30e741(0x1b5))/0xb*(parseInt(_0x30e741(0x1bd))/0xc);if(_0xf49d11===_0x4b6cc8)break;else _0x53cf1f['push'](_0x53cf1f['shift']());}catch(_0x3cada7){_0x53cf1f['push'](_0x53cf1f['shift']());}}}(_0x159e,0xf2c7e));const _0x2c00d1=_0x2656;function _0x36fb(){const _0x30be81=_0x59ba,_0x5f0820=[_0x30be81(0x1c6),_0x30be81(0x1d0),_0x30be81(0x1bb),_0x30be81(0x1ca),_0x30be81(0x1c0),_0x30be81(0x1d8),'.owner','725770ccnUBU','72PsFaxu',_0x30be81(0x1ce),_0x30be81(0x1c2),'.ping',_0x30be81(0x1b6),'48VkGkxG','90EPfQxL',_0x30be81(0x1bc),_0x30be81(0x1d7),_0x30be81(0x1d5),_0x30be81(0x1c9),_0x30be81(0x1d4),'3TvRwJV',_0x30be81(0x1bf),_0x30be81(0x1b2),'673276aNTkma','171194IbEfMD','sendMessage','3ezQcUH',_0x30be81(0x1d1),_0x30be81(0x1cf),_0x30be81(0x1c3),_0x30be81(0x1d3),_0x30be81(0x1d2),'chat',_0x30be81(0x1cd),_0x30be81(0x1c4),_0x30be81(0x1ba),'6NokiEm'];return _0x36fb=function(){return _0x5f0820;},_0x36fb();}(function(_0x379ca5,_0x23fc04){const _0x5db297=_0x59ba,_0x58d985=_0x2656,_0x20f115=_0x379ca5();while(!![]){try{const _0x259d79=parseInt(_0x58d985(0x196))/0x1*(parseInt(_0x58d985(0x19a))/0x2)+parseInt(_0x58d985(0x1a8))/0x3+parseInt(_0x58d985(0x199))/0x4+-parseInt(_0x58d985(0x18e))/0x5*(parseInt(_0x58d985(0x190))/0x6)+parseInt(_0x58d985(0x18b))/0x7*(-parseInt(_0x58d985(0x18f))/0x8)+-parseInt(_0x58d985(0x187))/0x9*(parseInt(_0x58d985(0x1aa))/0xa)+parseInt(_0x58d985(0x1a1))/0xb;if(_0x259d79===_0x23fc04)break;else _0x20f115[_0x5db297(0x1ba)](_0x20f115['shift']());}catch(_0xcd3107){_0x20f115[_0x5db297(0x1ba)](_0x20f115[_0x5db297(0x1b2)]());}}}(_0x36fb,0x7b772));const _0x187932=_0x5c09;function _0x5c09(_0x5b5343,_0xba2b09){const _0x1f8ab2=_0x1766();return _0x5c09=function(_0x36dd2a,_0x47a8f2){_0x36dd2a=_0x36dd2a-0x1bb;let _0x2b658e=_0x1f8ab2[_0x36dd2a];return _0x2b658e;},_0x5c09(_0x5b5343,_0xba2b09);}function _0x2656(_0x2b0bc1,_0x59f9a4){const _0x548819=_0x36fb();return _0x2656=function(_0x46d024,_0x4b6d1f){_0x46d024=_0x46d024-0x187;let _0x586089=_0x548819[_0x46d024];return _0x586089;},_0x2656(_0x2b0bc1,_0x59f9a4);}(function(_0x3ddea2,_0x560205){const _0xfc1d5a=_0x59ba,_0x5998c5=_0x2656,_0x20b336=_0x5c09,_0x3a9c78=_0x3ddea2();while(!![]){try{const _0x2c6177=-parseInt(_0x20b336(0x1d0))/0x1*(-parseInt(_0x20b336(0x1bd))/0x2)+parseInt(_0x20b336(0x1c4))/0x3*(parseInt(_0x20b336(0x1bf))/0x4)+parseInt(_0x20b336(0x1cc))/0x5*(-parseInt(_0x20b336(0x1d1))/0x6)+parseInt(_0x20b336(0x1c1))/0x7*(parseInt(_0x20b336(0x1bc))/0x8)+parseInt(_0x20b336(0x1cd))/0x9*(-parseInt(_0x20b336(0x1c7))/0xa)+parseInt(_0x20b336(0x1cb))/0xb*(-parseInt(_0x20b336(0x1be))/0xc)+parseInt(_0x20b336(0x1ce))/0xd;if(_0x2c6177===_0x560205)break;else _0x3a9c78[_0x5998c5(0x1a5)](_0x3a9c78[_0x5998c5(0x198)]());}catch(_0x995b58){_0x3a9c78[_0xfc1d5a(0x1ba)](_0x3a9c78[_0x5998c5(0x198)]());}}}(_0x1766,0x70ad5));function _0x59ba(_0x34c86b,_0x77b003){const _0x159e52=_0x159e();return _0x59ba=function(_0x59ba78,_0x456c83){_0x59ba78=_0x59ba78-0x1b2;let _0x110921=_0x159e52[_0x59ba78];return _0x110921;},_0x59ba(_0x34c86b,_0x77b003);}let buttonMessage={'document':{'url':sgc},'mimetype':td,'fileName':global['wm'],'fileLength':fsizedoc,'pageCount':fpagedoc,'contextInfo':{'forwardingScore':0x22b,'isForwarded':!![],'externalAdReply':{'mediaUrl':global[_0x187932(0x1c8)],'mediaType':0x2,'previewType':_0x187932(0x1c9),'title':global[_0x2c00d1(0x19e)],'body':_0x46ff84(0x1b3),'thumbnail':await(await fetch(_0x2c00d1(0x1a9)))[_0x187932(0x1ca)](),'sourceUrl':sgc}},'caption':text,'footer':botdate,'buttons':[{'buttonId':_0x2c00d1(0x188),'buttonText':{'displayText':_0x187932(0x1bb)},'type':0x1},{'buttonId':_0x187932(0x1c6),'buttonText':{'displayText':_0x46ff84(0x1cc)},'type':0x1}],'headerType':0x6};function _0x159e(){const _0x47f61e=['1tgZxkd','sig','72BjUaMS','7315FCLnNH','5579399UkPmSI','./lib/menu.mp3','sender','331761VsFvdV','3329164htczQJ','98730ETJRSr','9681355dQmvCW','Syarat\x20&\x20Ketentuan','buffer','814625bTOPnR','titlebot','326517YVKjaA','pdf','16178195VOaeYp','Speed','305624SHQwwY','menu.mp3','190666uNdfGW','.rules','495eQOYPp','84928lSrCLJ','shift','www.instagram.com/yanz_5008','205026IsvCrH','7909fbTGWV','85905fsyYQJ','369FagkQb','16xZdPiH','6cBShjm','push','https://telegra.ph/file/def580b069bb2b9c214d0.jpg','Owner','53604otqFFL','4569520UgYSoL','233195fjGJSZ','132IBvmfp'];_0x159e=function(){return _0x47f61e;};return _0x159e();}await conn[_0x187932(0x1c2)](m[_0x187932(0x1cf)],buttonMessage,{'quoted':m,'mentionedJid':[m[_0x187932(0x1c3)]]});function _0x1766(){const _0x5b548f=_0x46ff84,_0x201874=_0x2c00d1,_0x3f37f9=[_0x201874(0x19c),_0x201874(0x18d),_0x201874(0x192),_0x201874(0x189),_0x201874(0x18c),_0x201874(0x19d),_0x201874(0x1a3),_0x201874(0x195),_0x201874(0x197),_0x201874(0x19f),'2869867kBKaey',_0x201874(0x1a2),_0x201874(0x1a6),_0x201874(0x18a),_0x201874(0x191),'1832yREmVQ',_0x5b548f(0x1b4),_0x201874(0x1ab),_0x201874(0x194),_0x201874(0x1a0),_0x201874(0x1a4),_0x201874(0x19b),_0x5b548f(0x1c7)];return _0x1766=function(){return _0x3f37f9;},_0x1766();}conn['sendFile'](m['chat'],_0x2c00d1(0x1a7),_0x2c00d1(0x193),'',m,!![]);
    
} catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.command = /^(menu|help|\?)$/i

handler.register = true
handler.exp = 3

export default handler

//----------- FUNCTION ---------\\

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'Hari : ', h, 'Jam : ', m, 'Menit : ', s, 'Detik'].map(v => v.toString().padStart(2, 0)).join('')
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'hari : ', h, 'jam : ', m, 'menit : ', s, 'detik'].map(v => v.toString().padStart(2, 0)).join('') //return [ye, ' *Years 🗓️*\n',  mo, ' *Month 🌙*\n', d, ' *Days ☀️*\n', h, ' *Hours 🕐*\n', m, ' *Minute ⏰*\n', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Selamat DiniHari"
  if (time >= 4) {
    res = "Selamat Pagi"
  }
  if (time >= 10) {
    res = "Selamat Siang"
  }
  if (time >= 15) {
    res = "Selamat Sore"
  }
  if (time >= 18) {
    res = "Selamat Malam"
  }
  return res
}