//
let { MessageType } = (await import('@adiwajshing/baileys')).default
import { sticker } from '../lib/sticker.js'
let handler  = async (m, { conn, args }) => {
  let stiker = false
try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image|video/.test(mime)) {
      let img = await q.download()
      if (!img) throw 'Reply stiker nya!'
      m.reply(global.wait)
      stiker = await sticker(img, false, ' ', 'Lala BotzMD : wa.me/62895323263224\n\n(  www.instagram.com/yanz_5008  )')
    } else if (args[0]) stiker = await sticker(false, args[0],  ' ', 'Lala BotzMD : wa.me/62895323263224\n\n(  www.instagram.com/yanz_5008  )')
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    else throw 'Conversion failed'
  }
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s','sticker','stiker']

export default handler