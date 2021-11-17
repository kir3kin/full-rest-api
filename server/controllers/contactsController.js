const Contacts = require('../db/ContactsModel.js')
const dbConnect = require('../db/conf.js')
dbConnect()

class ContactsController {
	static getContacts = async (req, res) => {
		const all = await Contacts.find({})
		res.status(200).json(all)
	}

	static getContact = async (req, res) => {
		const contact = await Contacts.findById(req.params.id)
		res.status(200).json(contact)
	}

	static createContact = async (req, res) => {
		const contact = new Contacts({...req.body})
		const newContact = await contact.save()
		res.status(201).json(newContact)
	}

	static updateContact = async (req, res) => {
		const update = {
			name: req.body.name,
			email: req.body.email
		}
		const contact = await Contacts.findByIdAndUpdate(req.params.id, update, {new: true})
		res.status(200).json(contact)
	}

	static deleteContact = async (req, res) => {
		const filter = {_id: req.params.id}
		await Contacts.findOneAndRemove(filter)
		res.status(200).json({message: 'The contact has been deleted'})
	}
}

module.exports = ContactsController