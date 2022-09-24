import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
let response = args.join(' ').split('|')
  if (!args[0]) throw `Sertakan teksnya !\n\nContoh: .logololi LalaBot\n`
  m.reply('Proses...')
  let res = `https://ziy.herokuapp.com/api/maker/lolimaker?nama=${response[0]}&apikey=xZiyy`
  conn.sendFile(m.chat, res, 'sadboy.jpg', `Sudah Jadi`, m, false)
}
handler.help = ['logololi']
handler.tags = ['maker']
handler.command = /^(logololi)$/i
handler.register = false

handler.limit = false

export default handler
