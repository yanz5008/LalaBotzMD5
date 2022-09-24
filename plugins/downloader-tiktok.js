import { tiktokdl, tiktokdlv2, tiktokdlv3 } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw '\nSertakan link tiktoknya kak !\n\nContoh: .tiktok https://vt.tiktok.com/ZSRy13T78/'
    m.reply(global.wait)
    const { author: { nickname }, video, description } = await tiktokdl(args[0]).catch(async _ => await tiktokdlv2(args[0])).catch(async _ => await tiktokdlv3(args[0]))
    const url = video.no_watermark || video.no_watermark2 || video.no_watermark_raw
    if (!url) throw 'Can\'t download video!'
    conn.sendFile(m.chat, url, 'tiktok.mp4', 
`ᴛ ɪ ᴋ ᴛ ᴏ ᴋ :
• Name: ${nickname}
• Description: ${description}


                                    「 ʙʏ ʟᴀʟᴀ ʙᴏᴛ 」
`.trim(), m)
}
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = ['tt', 'tiktok', 'tiktokdl']

export default handler
