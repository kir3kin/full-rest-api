import {
	getContact,
	getContacts,
	createContactDB,
	updateContactDB,
	deleteContactDB
} from '../controllers/gContactsController.js'

export const root = {
	contacts: async () => await getContacts(),
	contact: async ({id}) => await getContact(id),
	createContact: async ({input}) => await createContactDB(input),
	updateContact: async ({id, input}) => await updateContactDB(id, input),
	deleteContact: async ({id}) => await deleteContactDB(id),
}
