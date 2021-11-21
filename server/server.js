const express = require('express')
const cors = require('cors')
const http = require('http')
const fileUpload = require('express-fileupload')

const contactsRouter = require('./routes/contactsRouter.js')
const path = require('path')

const PORT = 3040

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 * 8 },
	useTempFiles : true,
	tempFileDir : '/tmp/'
}))

// Routers
app.use('/api/contacts', contactsRouter)// REST API
app.use('/images', express.static(path.join(__dirname, 'images')))

// To start react-app on server
const buildPath = path.join(__dirname, '..', 'client', 'build')
app.use('/', express.static(buildPath))
app.get('/*', function (req, res) {
	res.sendFile(path.join(buildPath, 'index.html'))
})

const httpServer = http.createServer(app)
httpServer.listen(PORT, () => {
	console.log(`HTTP server has been started on ${PORT}`)
})