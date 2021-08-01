import mongoose from 'mongoose'
const { Schema, model } = mongoose

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	marked: {
		type: Boolean,
		default: false
	}
})
export const Contacts = model('Contacts', schema)