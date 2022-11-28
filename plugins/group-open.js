let handler = async (m, { conn, args, usedPrefix, command }) => {
await conn.groupSettingUpdate(m.chat, 'not_announcement')
m.reply(`_Successfully Opened Group !!_\n`)
}
handler.help = ['open', 'close']
handler.tags = ['group']
handler.command = /^(buka|open)$/i

handler.admin = true
handler.botAdmin = true

export default handler
