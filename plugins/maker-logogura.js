import fetch from 'node-fetch'
  import axios from 'axios'
let handler = async(m, { conn, usedPrefix, command, args }) => {
  
  let res = await(await fetch(`https://api-xzn-yotsuya.up.railway.app/docs/gura?name=${args[0]}`)).buffer()
  if(!args[0]) throw `Sertakan teksnya !\n\nContoh: ${usedPrefix}logogura Lala Bot\n`
  m.reply('proses..')
conn.sendButton(m.chat, 'Nih logo gwar guarnya >_<', author, res, [['Terimakasih', `mksh`]], m)
}
handler.help = ['logogura']
handler.tags = ['maker']
handler.command = ['logogura']
export default handler