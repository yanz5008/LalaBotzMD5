import { lyrics, lyricsv2 } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    if (!teks) throw `Contoh: ${usedPrefix}${command} mengharapkanmu`
    const result = await lyricsv2(teks).catch(async _ => await lyrics(teks))
    m.reply(`
Lyrics *${result.title}*
Author ${result.author}


${result.lyrics}


Url ${result.link}
`.trim())
}

handler.help = ['lirik']
handler.tags = ['tools']
handler.command = /^(lirik|lyrics|lyric)$/i

export default handler