import express from 'express'
import cors from 'cors'
import path from 'path'
import contactsRouter from './contacts/contactsRouter.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

// console.log('path.resolve():', path.resolve())
// app.use(express.static(path.resolve(path.resolve(), '../', 'client', 'build')))

app.use(contactsRouter)

app.listen(PORT, () => {
	console.log('server has been started...')
})