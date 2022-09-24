import { bucin } from '@bochilteam/scraper'

let handler = async (m, { conn, usedPrefix, command }) => conn.sendButton(m.chat, await bucin(), author, [
    ['Bucin', `${usedPrefix+command}`], 
], m)

handler.help = ['bucin']
handler.tags = ['quotes']
handler.command = /^(bucin|q-bucin)$/i

handler.group = true

export default handler
