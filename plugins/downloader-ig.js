import { instagramdl, instagramdlv2, instagramdlv3, instagramdlv4 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw '\nSertakan link instagram nya kak !\n\nContoh: .ig https://www.instagram.com/p/CLPWKRYgkEW/?igshid=YmMyMTA2M2Y='
      m.reply(global.wait)
    const results = await instagramdl(args[0])
        .catch(async _ => await instagramdlv2(args[0]))
        .catch(async _ => await instagramdlv3(args[0]))
        .catch(async _ => await instagramdlv4(args[0]))
    for (const { url } of results) await conn.sendFile(m.chat, url, 'instagram.mp4', `Url: ${url}\n\n${htjava} By Lala Bot`, m)
}
handler.help = ['instagram']
handler.tags = ['downloader']
handler.limit = true
handler.command = /^(instagram|ig(dl)?)$/i

export default handler
