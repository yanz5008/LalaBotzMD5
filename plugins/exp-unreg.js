import { createHash } from 'crypto'
let handler = async function (m, { args }) {
  if (!args[0]) throw 'Sertakan No Serinya !'
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw '\nNomor seri salah !\n\nJika lupa no serimu ketik .ceksn'
  user.registered = false
  m.reply('Succes.. Kamu telah dihapus dari database Lala bot !')
}
handler.help = ['unreg [no.seri]']
handler.tags = ['xp']

handler.command = /^unreg(ister)?$/i
handler.register = true

export default handler