import { Router } from 'express'
import {
	getMain,
	getContacts,
	createContact,
	deleteContact,
	updateContact
} from './contactsController.js'

const router = Router()
// router.get('*', getMain)
router.get('/api/contacts', getContacts)
router.post('/api/contacts', createContact)
router.delete('/api/contacts/:id', deleteContact)
router.put('/api/contacts/:id', updateContact)
// router.delete('/api/server/:id', remove)
export default router