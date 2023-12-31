//By https://github.com/DIEGO-OFC

import jimp from "jimp"
import uploadImage from "../lib/uploadImage.js"
import uploadFile from "../lib/uploadFile.js"

let handler = async (m, { conn, usedPrefix }) => {
	
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw "*[❕] PLEASE RESPOND TO AN IMAGE*"

let media = await q.download()
let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isMedia ? uploadImage : uploadImage)(media)

let source = await jimp.read(await link)
let height = await source.getHeight()
let width = await source.getWidth()

m.reply(`_*RESOLUTION :*_ ${width} x ${height}
> Ancho : ${width}
> Altura : ${height}
> Link: ${link}`)
}
handler.help = ['checkreso <reply | caption>', 'chekreso <reply | caption>']
handler.tags = ['tool']
handler.command = /^(checkreso(lution)?)$/i
handler.premium = true 

export default handler