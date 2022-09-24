import { facebook } from '../lib/scrape.js'
import { savefrom } from '@bochilteam/scraper'
import { facebookdl, facebookdlv2, facebookdlv3, aiovideodl } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `\nContoh:\n\n${usedPrefix}${command} https://m.facebook.com/story.php?story_fbid=pfbid02LBe4VkEC5WubK1qizv2tjHrXZzncSfnhFGVBGuyE7aVxpGquBqAUh619YN78cH4Ml&id=100011004884396`
    m.reply('ᴡᴀɪᴛ.. ᴛᴜɴɢɢᴜ sᴇᴊᴀᴍ')
    const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0])).catch(async _ => await facebookdlv3(args[0])).catch(async _ => await aiovideodl(args[0]))
    for (const { url, isVideo } of result.reverse()) conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `🌐 Url: ${url}\n\n\n                                「 ʙʏ ʟᴀʟᴀ ʙᴏᴛ 」`, m)
}
handler.help = ['facebook']
handler.tags = ['downloader']
handler.command = ['fb', 'fbdl', 'facebook', 'facebookdl']
handler.limit = true
export default handler