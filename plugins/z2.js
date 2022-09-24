import fs from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix }) => conn.sendButton(m.chat, '\nNani? (≧∇≦)', botdate, [
    ['Owner', `.owner`], 
    ['Menu', `.menu`]
], m)

handler.customPrefix = /^(p|tes|bot|lala|halo)$/i
handler.command = new RegExp

export default handler
