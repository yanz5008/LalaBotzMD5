let handler = async (m, { conn, args, command }) => {
	let group = m.chat
        await m.reply('Sayonara , , ! (≧ω≦)ゞ', m.chat) 
        await  conn.groupLeave(group)
        }
handler.help = ['oleavegc']
handler.tags = ['owner']
handler.command = /^(oleavegc)$/i

handler.rowner = true

export default handler