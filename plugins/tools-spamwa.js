let handler = async (m, { conn, text }) => {

let [nomor, pesan, jumlah] = text.split('|')
if (!nomor) throw '*[ ⚠️ ] HARAP MASUKKAN NOMOR YANG AKAN DI SPAM PESAN!*\nPENGGUNAAN YANG BENAR:\n#spamwa nomor|teks|jumlah\n\nContoh: #spamwa 628575223xxxx|hai :v|25'
if (!pesan) throw '*[ ⚠️ ] HARAP MASUKKAN PESAN YANG BENAR!*\nPENGGUNAAN YANG BENAR:\n#spamwa nomor|teks|jumlah\n\nContoh: #spamwa 628575223xxxx|hai :v|25'
if (jumlah && isNaN(jumlah)) throw '*[ ⚠️ ] KUANTITAS HARUS ADALAH NOMOR!*\nPENGGUNAAN YANG BENAR:\n#spamwa nomor|teks|jumlah\n\nContoh: #spamwa 628575223xxxx|hai :v|25'

let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
let fixedJumlah = jumlah ? jumlah * 1 : 10
if (fixedJumlah > 50) throw '*[ ⚠️ ] TERLALU BANYAK PESAN! JUMLAH HARUS KURANG DARI 50 PESAN*'
await m.reply(`*[❗] SPAM PESAN KE NOMOR ${nomor} ITU SUKSES DILAKUKAN*\n• JUMLAH TERKIRIM: ${fixedJumlah} pesan`)
for (let i = fixedJumlah; i > 1; i--) {
if (i !== 0) conn.reply(fixedNumber, pesan.trim(), m)
}}
handler.help = ['spamwa (62xxx|text|jumlah)']
handler.tags = ['tools']
handler.command = /^spam(wa)?$/i
handler.group = false
handler.premium = true
handler.private = true
handler.limit = true
export default handler
