import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
   let response = args.join(' ').split('|')
  if (!args[0]) throw `Sertakan teksnya !\n\nContoh: .logoneko Lala|Bot\n`
  m.reply('Proses...')
  let res = `https://ziy.herokuapp.com/api/maker/girlneko?text1=${response[0]}&text2=${response[1]}&apikey=xZiyy`
  conn.sendFile(m.chat, res, 'neko.jpg', `Sudah Jadi`, m, false)
}
handler.help = ['logoneko']
handler.tags = ['maker']
handler.command = /^(logoneko)$/i
handler.limit = false

export default handler
