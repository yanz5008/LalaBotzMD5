let handler = async (m, { usedPrefix, text }) => {
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) {
        throw `_*Masih ada absen di chat ini!*_\n\n*${usedPrefix}hapusabsen* - untuk menghapus absen`
    }
    conn.absen[id] = [
        conn.sendButton(m.chat, `Berhasil memulai absen!\n\n*${usedPrefix}absen* - untuk absen\n*${usedPrefix}cekabsen* - untuk mengecek absen\n*${usedPrefix}hapusabsen* - untuk menghapus data absen`, wm, absen, [['Absen','.absen']],m),
        [],
        text
    ]
}
handler.help = ['mulaiabsen (text)']
handler.tags = ['group']
handler.command = ['mulaiabsen']
handler.group = true
handler.admin = true
export default handler
