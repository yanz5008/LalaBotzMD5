//Credits Jangan Dihapus
//Thanks For KannaChan & Papah-Chan
import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
let pp = await conn.profilePictureUrl(m.chat).catch(_ => null)

let str = `● Syarat & ketentuan :

Nomor LalaBot resmi hanya ada di bit.ly/LalaBotzwa

1. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim
2. Kami tidak akan pernah meminta anda untuk memberikan informasi pribadi
3. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot
4. Apapun yang anda perintah pada bot ini, KAMI TIDAK AKAN BERTANGGUNG JAWAB!
5. Jangan spam bot.
6. Jangan telepon bot.
7. Jangan mengeksploitasi bot

Konsekuensi Bila Melanggar Rules, Bot Akan Memblokir+Baned Permanen Dan Akan Keluar Dari Grup Yang Kamu Kelola,

Rules ini untuk kenyamanan semua yang memakai bot ini.

Thanks !
`
let wibu = `https://telegra.ph/file/f66668a60b01302a650c1.jpg` 
let thumb = await(await fetch(wibu)).buffer()
conn.sendButtonDoc(m.chat, str, botdate,'Sewa Bot','.zxz', m, { contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: "https://telegra.ph/file/f66668a60b01302a650c1.jpg",
    mediaType: "VIDEO",
    description: "https://www.instagram.com/p/CLPWKRYgkEW/?igshid=YmMyMTA2M2Y=", 
    title: 'Syarat & Ketentuan',
    body: wm,
    thumbnail: thumb,
    sourceUrl: sgc
  }
  } }) 
          }
handler.help = ['rules']
handler.tags = ['info']
handler.command =  /^(rules|rulesbot)$/i

export default handler
