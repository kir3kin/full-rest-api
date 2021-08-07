import { Router } from 'express'
import {
	getContacts,
	createContact,
	deleteContact,
	updateContact,
	getContact
} from '../controllers/contactsController.js'

const router = Router()
router.get('/api/contacts', getContacts)
router.get('/api/contacts/:id', getContact)
router.post('/api/contacts', createContact)
router.delete('/api/contacts/:id', deleteContact)
router.put('/api/contacts/:id', updateContact)
export default router
