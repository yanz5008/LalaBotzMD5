import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
m.reply('Astagfirullah 😳')
}

handler.command = ['bilek']

export default handler
