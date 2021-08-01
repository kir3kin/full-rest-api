import { Contacts } from '../db/ContactsModel.js'

export const getContacts = async (req, res) => {
	const all = await Contacts.find({})
	res.json(all)
}

export const createContact = async (req, res) => {
	const contact = new Contacts({...req.body})
	const newContact = await contact.save()
	res.status(201).json(newContact)
}

export const updateContact = async (req, res) => {
	const contact = await Contacts.findById(req.params.id)
	contact.name = req.body.name
	contact.email = req.body.email
	const uContact = await contact.save()
	res.status(200).json(uContact)
}

export const deleteContact = async (req, res) => {
	const filter = {_id: req.params.id}
	await Contacts.findOneAndRemove(filter)
	res.status(200).json({message: 'The contact has been deleted'})
}