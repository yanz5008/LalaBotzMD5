let handler = async (m, { conn }) => {
	//-----PRICE
//sewa
let sh = '5'
let sn = '10'
let ss = '25'
//premium
let ph = '5'
let pn = '10'
let info = `• SEWA BOT MASUK GRUP :
- 1 Minggu : 5k
- 1 Bulan : 10K
- Permanen : 25K

• PREMIUM :
- 1 Bulan : 5k
- Permanen : 10k

Via GO-PAY / DANA/PULSA:
• Pulsa: [${ppulsa}]
• Gopay: [${pgopay}]
• Dana: [${pdana}]

Jika Minat Hubungi Owner:
             Wa.me/${nomorown} (Owner)`
const sections = [
   {
	title: `${htjava} SEWA :`,
	rows: [
	    {title: "🔖 𝗛𝗘𝗠𝗔𝗧", rowId: '.order *Paket:* HEMAT • Sewa', description: '𝗣𝗿𝗶𝗰𝗲: ' + sh + 'k (1 minggu)' },
	    {title: "🔖 𝗡𝗢𝗥𝗠𝗔𝗟", rowId: '.order *Paket:* NORMAL • Sewa', description: '𝗣𝗿𝗶𝗰𝗲: ' + sn + 'k (1 bulan)' },
	{title: "🔖 𝗩𝗜𝗣", rowId: '.order *Paket:* VIP • Sewa', description: '𝗣𝗿𝗶𝗰𝗲: ' + ss + 'k (Permanen)' },
	]
    }, {
    title: `${htjava} PREMIUM :`,
	rows: [
	    {title: "🌟 𝗛𝗘𝗠𝗔𝗧", rowId: '.order *Paket:* HEMAT • Premium', description: '𝗣𝗿𝗶𝗰𝗲: ' + ph + 'k (1 Bulan)' },
	    {title: "🌟 𝗩𝗜𝗣", rowId: '.order *Paket:* VIP • Premium', description: '𝗣𝗿𝗶𝗰𝗲: ' + pn + 'k (Permanen)' },
	]
    },
]

const listMessage = {
  text: info,
  footer: botdate,
  title: wm,
  buttonText: "Click Here!",
  sections
}
await conn.sendMessage(m.chat, listMessage)
//conn.sendHydrated(m.chat, info, wm, null, sgc, "🌎 Group Official", null,null, [['Owner','.owner']], m)
}

handler.help = ['sewabot']
handler.tags = ['info']
handler.command = /^(premium|sewa|sewabot|zxz)$/i

export default handler
