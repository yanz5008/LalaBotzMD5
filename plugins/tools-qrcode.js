
import { toDataURL } from 'qrcode'

let handler = async (m, { conn, text }) => conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '\n                                「 ʙʏ ʟᴀʟᴀ ʙᴏᴛ 」', m)

handler.help = ['qrcode (text)']
handler.tags = ['tools']
handler.command = /^qr(code)?$/i


export default handler