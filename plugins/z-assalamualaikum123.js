import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
m.reply('_Waalaikumsalam Wr Wb._')
}
handler.customPrefix = /assal/i
handler.command = new RegExp

export default handler
