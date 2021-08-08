import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

const privateKey = fs.readFileSync(path.resolve(__dirname, './keys/selfsigned.key'), 'utf8')
const certificate = fs.readFileSync(path.resolve(__dirname, './keys/selfsigned.crt'), 'utf8')

export const credentials = {key: privateKey, cert: certificate}