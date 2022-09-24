let handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    m.reply(`
• ${conn.getName(m.sender)} Sedang Coli\n• Dengan Alasan: ${text ? '' + text : 'Tanpa Alasan'}
  `)
}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler