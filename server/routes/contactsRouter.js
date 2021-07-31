import { Router } from 'express'
import {
	getContacts,
	createContact,
	deleteContact,
	updateContact
} from '../controllers/contactsController.js'

const router = Router()
router.get('/api/contacts', getContacts)
router.post('/api/contacts', createContact)
router.delete('/api/contacts/:id', deleteContact)
router.put('/api/contacts/:id', updateContact)
export default router
