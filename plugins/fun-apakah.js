let handler = async (m, { command, text }) => m.reply(`
• Pertanyaan: ${command} ${text}
• Jawaban: ${['Mungkin suatu hari', 'Kurasa tidak', 'Ulangi kak, lala gak paham😑', 'Coba tanya lagi🤔', 'Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin'].getRandom()}
  `.trim(), null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})

handler.help = ['apakah (teks)']
handler.tags = ['fun']
handler.command = ['apakah']

export default handler
