const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())

const root = path.resolve(__dirname, '../', 'client', 'build')
app.use(express.static(root))

app.get('*', (req, res) => {
	res.sendFile('index.html')
})
app.listen(PORT, () => {
	console.log('server has been started...')
})