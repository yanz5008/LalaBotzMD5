import fs from 'fs'
import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix: _p }) => {
let [number, pesan, boddy] = text.split `|`

let td = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

    if (!number) return conn.reply(m.chat, 'Silahkan masukan nomor yang akan dikirim\nContoh: .chatpc 62xxx|teks\n', m)
    if (!pesan) return conn.reply(m.chat, 'Silahkan masukan pesannya\nContoh: .chatpc 62xxx|teks\n', m)
    if (text > 500) return conn.reply(m.chat, 'Teks Kepanjangan!', m)
    
    let user = global.db.data.users[m.sender]

    let korban = `${number}`
    var nomor = m.sender
    let spam1 = `👋🏻Hai.. Ini Pesan Dari Owner Lala\n\n• Untuk: ${korban}@g.us\n• Pesan : ${pesan}\n\n${global.botdate}`

    await conn.reply(korban + '@s.whatsapp.net', spam1, 0, {
    contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: '',
    mediaType: 2,
    title: global.wm, 
    body: 'Hai,Ini Balasan Pesan Dari Owner',  
    sourceUrl: sgc, 
    thumbnail: fs.readFileSync('./thumbnail.jpg')
      }}
     })    

{

    let logs = `[!] Berhasil mengirim pesan wa ke nomor ${korban}\n`
    conn.reply(m.chat, logs, m)
}}
handler.help = ['chatpc']
handler.tags = ['owner']
handler.command = /^(chatpc)$/i
handler.owner = true

export default handler
