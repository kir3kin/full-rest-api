const { Router } = require('express')
const ContactsController = require('../controllers/contactsController.js')

const router = Router()
router.get('', ContactsController.getContacts)
router.get('/:id', ContactsController.getContact)
router.post('', ContactsController.createContact)
router.delete('/:id', ContactsController.deleteContact)
router.put('/:id', ContactsController.updateContact)

module.exports = router
