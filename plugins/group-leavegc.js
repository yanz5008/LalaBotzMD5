let handler = async (m, { conn, args, command }) => {
	let group = m.chat
        await m.reply('Sayonara , , ! (≧ω≦)ゞ', m.chat) 
        await  conn.groupLeave(group)
        }
handler.help = ['leavegc']
handler.tags = ['group']
handler.command = /^(out|leavegc)$/i

handler.group = true
handler.admin = true

export default handler