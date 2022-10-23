let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
	const sections = [
   {
	title: `${dmenub} Silahkan pilih mana yg mau di on/off`,
	rows: [
	{title: "• Welcome", rowId: `${usedPrefix + command} *welcome*`},
	{title: "• Antilink", rowId: `${usedPrefix + command} *antilink*`},
	{title: "• Antidelete", rowId: `${usedPrefix + command} *antidelete*`},
	{title: "• Simi", rowId: `${usedPrefix + command} *simi*`},
	{title: "• Nsfw", rowId: `${usedPrefix + command} *nsfw*`},
	{title: "• Document", rowId: `${usedPrefix + command} *document*`},
	{title: "\nPlis gw lagi sange banget☺"},
	{title: "• Public", rowId: `${usedPrefix + command} *public*`},
	{title: "• Detect", rowId: `${usedPrefix + command} *detect*`},
	{title: "• PremNsfwChat", rowId: `${usedPrefix + command} *premnsfwchat*`},
	{title: "• Restrict", rowId: `${usedPrefix + command} *restrick*`},
	{title: "• Nyimak", rowId: `${usedPrefix + command} *nyimak*`},
	{title: "• Autoread", rowId: `${usedPrefix + command} *autoread*`},
	{title: "• PcOnly", rowId: `${usedPrefix + command} *pconly*`},
	{title: "• GcOnly", rowId: `${usedPrefix + command} *gconly*`},
	{title: "• SwOnly", rowId: `${usedPrefix + command} *swonly*`},
	]
    },
]

const listMessage = {
  text: ' ',
  footer: botdate,
  title: wm,
  buttonText: "Click Here!",
  sections
}

  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
case 'welcome':
case '*welcome*':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
case 'antilink':
case '*antilink*':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break
case 'antidelete':
case '*antidelete*':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break
case 'simi':
case '*simi*':
        if (!isROwner) {
        if (!(isAdmin || isOwner)) {
          global.dfail('rowner', m, conn)
          throw false
        }}
      chat.simi = isEnable
      break
case 'nsfw':  
case '*nsfw*':
        if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }}
      chat.nsfw = isEnable
      break
case 'document':     
case '*document*':
        if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
       chat.useDocument = isEnable
       }}
       break    
case 'public':    
case '*public*':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
case 'detect':
case '*detect*':
       if (!m.isGroup) {
         if (!isOwner) {
           global.dfail('group', m, conn)
           throw false
         }
       } else if (!isAdmin) {
         global.dfail('admin', m, conn)
         throw false
       }
       chat.detect = isEnable
       break
case 'premnsfwchat':      
case '*premnsfwchat*':
        if (m.isGroup) {
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }}
      chat.premnsfw = isEnable
      break
case 'restrict':    
case '*restrict*':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break
case 'nyimak':    
case '*nyimak*':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['nyimak'] = isEnable
      break
case 'autoread':    
case '*autoread*':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break
case 'privateonly':
case 'pconly':
case '*pconly*':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break
case 'grouponly':
case 'gconly':
case '*gconly*':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break
case 'statusonly':
case 'swonly':    
case '*swonly*':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['swonly'] = isEnable
      break
/*case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = isEnable
      break*/
/*case 'autodelvn':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
           global.dfail('admin', m, conn)
          throw false
         }
       }
      chat.autodelvn = isEnable
       break*/
/*case 'toxic':
       if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
           throw false
        }
      }
       chat.antiToxic = !isEnable
       break*/
/*case 'antitoxic':
       if (m.isGroup) {
         if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
         }
      }
      chat.antiToxic = isEnable
      break*/
/*case 'autolevelup':
       isUser = true
       user.autolevelup = isEnable
       break*/
/*case 'mycontact':
case 'mycontacts':
case 'whitelistcontact':
case 'whitelistcontacts':
case 'whitelistmycontact':
case 'whitelistmycontacts':
         if (!isOwner) {
         global.dfail('owner', m, conn)
          throw false
       }
       conn.callWhitelistMode = isEnable
       break*/
    
default:
      if (!/[01]/.test(command)) return await conn.sendMessage(m.chat, listMessage)
      throw false
  }
  conn.sendButton(m.chat, `Succes ${isEnable ? 'On' : 'Off'} ${type} Di ${isAll ? 'Bot Ini' : isUser ? '' : 'Obrolan Ini'} !\n`,
botdate, null, [[`${isEnable ? '✖️ Off' : '✔️ On'}`, `${isEnable ? `.off ${type}` : `.on ${type}`}`], ['Menu', '.menu']],m)
}
handler.help = ['on','off']
handler.tags = ['group']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler
