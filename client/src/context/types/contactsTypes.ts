import { iContact } from "../../interfaces/contacts"

export enum ActionType {
	FETCH_CONTACTS,
	FETCH_CONTACT,
	REMOVE_CONTACT,
	ADD_CONTACT,
	UPDATE_CONTACT,
	SHOW_LOADER,
	HIDE_LOADER
}
// actions
export interface fetchContacts {
	type: ActionType.FETCH_CONTACTS,
	payload: iContact[]
}

export interface removeContact {
	type: ActionType.REMOVE_CONTACT
	payload: string
}

export interface addContact {
	type: ActionType.ADD_CONTACT
	payload: iContact
}

export interface updateContact {
	type: ActionType.UPDATE_CONTACT
	payload: iContact
}

export interface showLoader {
	type: ActionType.SHOW_LOADER
}

export interface hideLoader {
	type: ActionType.HIDE_LOADER
}

export type ContactsActions = fetchContacts | removeContact | addContact | updateContact | showLoader | hideLoader