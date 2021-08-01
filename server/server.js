import express from 'express'
import cors from 'cors'
import http from 'http'

import contactsRouter from './routes/contactsRouter.js'
import { dbConnect } from './db/config.js'

const app = express()
const PORT = process.env.PORT || 3048

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()
app.use(contactsRouter)

const httpServer = http.createServer(app)

httpServer.listen(PORT, () => {
	console.log('server has been started...')
})