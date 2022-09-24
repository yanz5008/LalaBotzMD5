import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
m.reply('_Jangan Toxic dong kak!_')
}
handler.customPrefix = /^(ppk|anjing|ajg|anj|tolol|kontol|kntl|bangsat|bngst|memek|mmk|pepek|pepeq|babi)$/i
handler.command = new RegExp

export default handler
