import { Contacts } from '../db/ContactsModel.js'
import { dbConnect } from '../db/config.js'
dbConnect()

export const getContacts = async () =>
	await Contacts.find({})

export const getContact = async (id) =>
	await Contacts.findById(id)

export const createContactDB = async (inputData) => {
	const contact = new Contacts(inputData)
	return await contact.save()
}

export const updateContactDB = async (id, updateData) =>
	await Contacts.findByIdAndUpdate(id, updateData, {new: true})

export const deleteContactDB = async (id) =>
	await Contacts.findOneAndDelete({ _id: id })