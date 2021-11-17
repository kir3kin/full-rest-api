const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
})
const Contacts = model('Contacts', schema)

module.exports = Contacts