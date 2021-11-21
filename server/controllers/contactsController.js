const Contacts = require('../db/ContactsModel.js')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const dbConnect = require('../db/conf.js')
dbConnect()

class ContactsController {
	static imagePath = path.resolve(__dirname, '..', 'images')

	static checkImage = (req) => {
		return !!req.files?.image
	}

	static createImg = (req, imageName) => {
		if (this.checkImage(req)) {
			const { image } = req.files
			image.mv(path.join(this.imagePath, imageName))
		}
	}

	static deleteImg = (imageName) => {
		try {
			fs.unlinkSync(path.join(this.imagePath, imageName))
		} catch (e) {}
	}

	static getContacts = async (req, res) => {
		try {
			const all = await Contacts.find({})
			res.status(200).json(all)
		} catch(e) {
			res.status(400).json({
				message: "Error getting Contacts!", error: e.toString()
			})
		}
	}

	static getContact = async (req, res) => {
		try {
			const contact = await Contacts.findById(req.params.id)
			res.status(200).json(contact)
		} catch(e) {
			res.status(400).json({
				message: "Error getting Contact!", error: e.toString()
			})
		}
	}

	static createContact = async (req, res) => {
		try {
			const { name, email } = req.body
			const image = this.checkImage(req) ? `${uuid.v4()}.jpg` : ''
			
			const contact = new Contacts({
				name, email, image
			})
	
			const newContact = await contact.save()
			this.createImg(req, image)

			res.status(201).json(newContact)
		} catch (e) {
			res.status(400).json({
				message: "Error creating Contact!", error: e.toString()
			})
		}
	}

	static updateContact = async (req, res) => {
		try {
			const newImage = this.checkImage(req) ? `${uuid.v4()}.jpg` : ''
			let prevImage
			
			const temp = await Contacts.findById(req.params.id)
			prevImage = (temp && temp.image) ? temp.image : ''
			
			const update = {
				name: req.body.name,
				email: req.body.email,
				image: newImage
			}
			
			const contact = await Contacts.findByIdAndUpdate(req.params.id, update, {new: true})

			if (contact !== null) {
				this.deleteImg(prevImage)
				this.createImg(req, newImage)
			}

			res.status(200).json(contact)
		} catch (e) {
			res.status(400).json({
				message: "Error updating Contact!", error: e.toString()
			})
		}
	}

	static deleteContact = async (req, res) => {
		try {
			const filter = {_id: req.params.id}
			const contact = await Contacts.findOneAndRemove(filter)
			if (contact !== null) this.deleteImg(contact.image)

			res.status(200).json({message: 'The contact has been deleted'})
		} catch (e) {
			res.status(400).json({
				message: "Error deleting Contact!", error: e.toString()
			})
		}
	}


}
	
module.exports = ContactsController