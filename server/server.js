const express = require('express')
const cors = require('cors')
const http = require('http')
// import https from 'https'
// import { credentials } from './keys/credentials.js'

const contactsRouter = require('./routes/contactsRouter.js')
// import {graphUrl, graphHttp} from './routes/gContactsRouter.js'
const path = require('path')


const PORTS = {
	'HTTP': 3040,
	'HTTPS': 3043
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
app.use('/api/contacts', contactsRouter)// REST API
// app.use(graphUrl, graphHttp)// GraphQL

// To start react-app on server
const buildPath = path.join(__dirname, '..', 'client', 'build')
app.use('/', express.static(buildPath))
app.get('/*', function (req, res) {
res.sendFile(path.join(buildPath, 'index.html'))
})


const httpServer = http.createServer(app)
// const httpsServer = https.createServer(credentials, app)

httpServer.listen(PORTS['HTTP'], () => {
	console.log(`HTTP server has been started on ${PORTS.HTTP}`)
})
// httpsServer.listen(PORTS['HTTPS'], () => {})