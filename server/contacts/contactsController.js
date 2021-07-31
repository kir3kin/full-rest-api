import { v4 }  from 'uuid'

let CONTACTS = [
	{id: v4(), name: 'Hillary Eilish', value: '+23 983 09 12', marked: false},
	{id: v4(), name: 'Donny Darko', value: '+39 483 09 1221', marked: false}
]

export const getMain = (req, res) => {
	console.log('heeeeee')
	res.sendFile('index.html')
}

export const getContacts = (req, res) => {
	res.status(200).json(CONTACTS)
}

export const createContact = (req, res) => {
	const contact = {...req.body, id: v4(), marked: false}
	CONTACTS.push(contact)
	res.status(201).json(contact)
}

export const deleteContact = (req, res) => {
	CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
	res.status(200).json({message: 'The contact has been deleted'})
}

export const updateContact = (req, res) => {
	const idx = CONTACTS.findIndex(c => c.id === req.params.id)
	CONTACTS[idx] = req.body
	res.json(CONTACTS[idx])
}