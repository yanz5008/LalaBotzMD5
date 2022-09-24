import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw '\nApa yg mau dicari kak?\n\nContoh: .play mengharapkanmu'
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Tidak ditemukan'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendButton(m.chat, `
• YOUTUBE PLAY •

${htjava} Title: ${title}
${htjava} Durasi: ${durationH}


${htjava} Url: ${url}`, botdate, thumbnail, [
    ['🔎 Youtube Search', `${usedPrefix}yts ${url}`],
   ['🎶 Audio', `${usedPrefix}yta ${url} yes`],
    ['🎥 Video', `${usedPrefix}ytv ${url} yes`]
  ], m) 
}
handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^play2?$/i

handler.register = true

export default handler
