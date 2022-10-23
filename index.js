console.log('⏳ Starting...')

import yargs from 'yargs'
import cfonts from 'cfonts'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { createRequire } from 'module'
import { createInterface } from 'readline'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the ability to create the 'require' method
const { name, author } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
function _0x37fe(_0x1965d6,_0x2d72d9){var _0x387a33=_0x387a();return _0x37fe=function(_0x37fe6f,_0x320a0f){_0x37fe6f=_0x37fe6f-0x141;var _0x516155=_0x387a33[_0x37fe6f];return _0x516155;},_0x37fe(_0x1965d6,_0x2d72d9);}var _0x45da1c=_0x37fe;function _0x387a(){var _0x39ebdd=['194zfeXvE','push','92985qoLYNG','center','Lala\x20Bot\x20MD','630279NTLjCN','5AHSaNo','2988JnwnwX','341QnkGtY','\x27Lala\x20BotMD\x27\x20By\x20Yanz_5008','10svqYTx','10129esFmmX','blue','350QANZZs','172068enLMnK','97164JxLhGN','2222232NBKTMu','264jYCHXH','4176024auqeDv','13620aNWFgI','2045184LPHiOq','86vKRjsc','shift','7FvzlFU','4948014xBXEwq','console','2334328hqlAMq'];_0x387a=function(){return _0x39ebdd;};return _0x387a();}(function(_0xa842cb,_0x4fa94b){var _0x2eb20c=_0x37fe,_0xb359aa=_0xa842cb();while(!![]){try{var _0x2efa02=parseInt(_0x2eb20c(0x154))/0x1*(parseInt(_0x2eb20c(0x149))/0x2)+parseInt(_0x2eb20c(0x142))/0x3+parseInt(_0x2eb20c(0x159))/0x4+-parseInt(_0x2eb20c(0x14f))/0x5*(parseInt(_0x2eb20c(0x146))/0x6)+parseInt(_0x2eb20c(0x145))/0x7*(-parseInt(_0x2eb20c(0x15b))/0x8)+-parseInt(_0x2eb20c(0x14e))/0x9*(parseInt(_0x2eb20c(0x153))/0xa)+-parseInt(_0x2eb20c(0x15a))/0xb*(parseInt(_0x2eb20c(0x158))/0xc);if(_0x2efa02===_0x4fa94b)break;else _0xb359aa['push'](_0xb359aa['shift']());}catch(_0x50879f){_0xb359aa['push'](_0xb359aa['shift']());}}}(_0x387a,0x94a00));var _0x4edc91=_0x320c;function _0x4447(){var _0x3a1a3e=_0x37fe,_0x5a8db5=[_0x3a1a3e(0x151),_0x3a1a3e(0x143),_0x3a1a3e(0x14b),_0x3a1a3e(0x152),_0x3a1a3e(0x141),_0x3a1a3e(0x14d),_0x3a1a3e(0x157),_0x3a1a3e(0x147),_0x3a1a3e(0x155),_0x3a1a3e(0x14c),'4cURhRV',_0x3a1a3e(0x150),'9110sCWCKC',_0x3a1a3e(0x156),_0x3a1a3e(0x148),'365343aOvsPt','green','10883JFupbR','chrome'];return _0x4447=function(){return _0x5a8db5;},_0x4447();}function _0x320c(_0x292b74,_0x139269){var _0x544d2f=_0x4447();return _0x320c=function(_0x56bbf0,_0x27da73){_0x56bbf0=_0x56bbf0-0x110;var _0xa83e05=_0x544d2f[_0x56bbf0];return _0xa83e05;},_0x320c(_0x292b74,_0x139269);}(function(_0x18ff6f,_0x30233b){var _0xb25b71=_0x37fe,_0x3fe9d5=_0x320c,_0x6327b6=_0x18ff6f();while(!![]){try{var _0x13ea59=-parseInt(_0x3fe9d5(0x11a))/0x1*(parseInt(_0x3fe9d5(0x11d))/0x2)+-parseInt(_0x3fe9d5(0x118))/0x3*(-parseInt(_0x3fe9d5(0x113))/0x4)+parseInt(_0x3fe9d5(0x11e))/0x5+parseInt(_0x3fe9d5(0x120))/0x6*(parseInt(_0x3fe9d5(0x116))/0x7)+-parseInt(_0x3fe9d5(0x117))/0x8+parseInt(_0x3fe9d5(0x114))/0x9*(parseInt(_0x3fe9d5(0x115))/0xa)+parseInt(_0x3fe9d5(0x11c))/0xb*(parseInt(_0x3fe9d5(0x122))/0xc);if(_0x13ea59===_0x30233b)break;else _0x6327b6[_0xb25b71(0x14a)](_0x6327b6[_0xb25b71(0x144)]());}catch(_0x194cd9){_0x6327b6[_0xb25b71(0x14a)](_0x6327b6[_0xb25b71(0x144)]());}}}(_0x4447,0x3adb7),say(_0x4edc91(0x121),{'font':_0x4edc91(0x11b),'align':_0x45da1c(0x14c),'gradient':[_0x45da1c(0x155),_0x4edc91(0x119)]}),say(_0x4edc91(0x11f),{'font':_0x4edc91(0x110),'align':_0x4edc91(0x112),'gradient':[_0x4edc91(0x111),_0x4edc91(0x119)]}));
var isRunning = false
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), { font: 'console', align: 'center', gradient: ['red', 'magenta'] })
  setupMaster({ exec: args[0], args: args.slice(1) })
  let p = fork()
  p.on('message', data => {
    console.log('[✅RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('[❗]Exited with code:', code)
    if (code !== 0) return start(file)
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
}

start('main.js')
