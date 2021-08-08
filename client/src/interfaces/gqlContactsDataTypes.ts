import { iContact } from "./contacts";

export type getContactsDataType = {
	data: {
		data: {
			contacts: iContact[]
		}
	}
}

export type createContactDataType = {
	data: {
		data: {
			createContact: iContact
		}
	}
}

export type updateContactDataType = {
	data: {
		data: {
			updateContact: iContact
		}
	}
}

export type deleteContactDataType = {
	data: {
		data: {
			deleteContact: iContact
		}
	}
}