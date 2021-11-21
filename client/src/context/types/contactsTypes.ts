import { iContact } from "../../interfaces/contacts"
import { loadingStatus } from "../../interfaces/contactsContext"

export enum ActionType {
	FETCH_CONTACTS,
	FETCH_CONTACT,
	REMOVE_CONTACT,
	ADD_CONTACT,
	UPDATE_CONTACT,
	CHANGE_CONTACT_STATUS,
	CHANGE_CONTACTS_STATUS
}
// actions
export interface fetchContacts {
	type: ActionType.FETCH_CONTACTS,
	payload: iContact[]
}

export interface fetchContact {
	type: ActionType.FETCH_CONTACT,
	payload: iContact | null
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

export interface changeContactStatus {
	type: ActionType.CHANGE_CONTACT_STATUS
	payload: loadingStatus
}

export interface changeContactsStatus {
	type: ActionType.CHANGE_CONTACTS_STATUS
	payload: loadingStatus
}



export type ContactsActions = fetchContacts | fetchContact | removeContact | addContact | updateContact | changeContactStatus | changeContactsStatus