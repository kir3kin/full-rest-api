import { Router } from 'express'
import { dbConnect } from '../db/config.js'
import {
	getContacts,
	createContact,
	deleteContact,
	updateContact,
	getContact
} from '../controllers/contactsController.js'


dbConnect()


const router = Router()
router.get('/api/contacts', getContacts)
router.get('/api/contacts/:id', getContact)
router.post('/api/contacts', createContact)
router.delete('/api/contacts/:id', deleteContact)
router.put('/api/contacts/:id', updateContact)
export default router
