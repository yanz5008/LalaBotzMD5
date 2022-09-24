let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let b
    do b = ps.getRandom()
    while (b === a)
    m.reply(`Cie yg lagi jadian😁\n${toM(a)} ❤️ ${toM(b)}`, null, {
        mentions: [a, b]
    })
}
handler.help = ['jadian']
handler.tags = ['fun']
handler.command = ['jadian']

handler.group = true

export default handler