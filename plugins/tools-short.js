import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args }) => {
	let title = `— *S H O R T E D  U R L* —`
    let caption = 'Silahkan Pilih Type Urlnya kak'
const sections = [
   {
	title: "TYPE URL",
	rows: [
	    {title: "TinyUrl", rowId: ".short " + args[0] + " tinyurl"},
	    {title: "LinkPoi", rowId: ".short " + args[0] + " linkpoi"},
	    {title: "Bitly", rowId: ".short " + args[0] + " bitly"},
	]
    },
]

const listMessage = {
  text: caption,
  footer: null,
  title: title,
  buttonText: "Shorted Link",
  sections
}

if (!args[0]) return m.reply('Linknya mana?')
if (!args[1]) return conn.sendMessage(m.chat, listMessage)

//TINY
if (args[1] == "tinyurl") {
	let res = await fetch(`https://api.xteam.xyz/shorturl/tinyurl?url=${args[0]}&APIKEY=ebb6251cc00f9c63`)
    let json = await res.json()
    let { result } = await json
    let { link } = result
m.reply('_*Prosses...*_')
conn.reply(m.chat, `💌 *Link:* ${link}`,m)
}
//--------------

//LINKPOI
if (args[1] == "linkpoi") {
	let poi = await fetch(`https://linkpoi.ga/api.php?url=${args[0]}`)
	let jpoi = await poi.json()
	let { shorturl } = jpoi
	m.reply('_*Prosses...*_')
conn.reply(m.chat, `💌 *Link:* ${shorturl.replace('\/','/')}`,m)
}
//------------
if (args[1] == "bitly") {
	let bit = await fetch(`https://api.xteam.xyz/shorturl/bitly?url=${args[0]}&APIKEY=ebb6251cc00f9c63`)
	let bitly = await bit.json()
	let { result } = bitly
	let { link } = result
	m.reply('_*Prosses...*_')
conn.reply(m.chat, `💌 *Link:* ${link}`,m)
}
}
handler.help = ['short (url)']
handler.tags = ['tools']
handler.command = ['short']

export default handler
