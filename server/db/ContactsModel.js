const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		dropDups: true
	},
	image: {
		type: String
	}
})
const Contacts = model('Contacts', schema)

module.exports = Contacts