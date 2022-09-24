//Credits Jangan Dihapus
//Thanks For KannaChan & Papah-Chan
import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
let pp = await conn.profilePictureUrl(m.chat).catch(_ => null)

let str = `┌─「 *Donasi* 」
│ • Tri: [${global.ppulsa2}]
│ • Indosat: [${global.ppulsa}]
│ • Gopay/Dana: [${global.pdana}]
❏
`
let wibu = `https://telegra.ph/file/f66668a60b01302a650c1.jpg` 
let thumb = await(await fetch(wibu)).buffer()
conn.sendButtonDoc(m.chat, str, botdate,'\nGw mau jujur nih, sebenarnya gw suka ngegay','/bilek', m, { contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: "https://telegra.ph/file/f66668a60b01302a650c1.jpg",
    mediaType: "VIDEO",
    description: "https://www.instagram.com/p/CLPWKRYgkEW/?igshid=YmMyMTA2M2Y=", 
    title: 'Follow Instagram Creator',
    body: wm,
    thumbnail: thumb,
    sourceUrl: sgc
  }
  } }) 
          }
handler.help = ['donasi']
handler.tags = ['info']
handler.command =  /^(donasi|donate)$/i

export default handler
