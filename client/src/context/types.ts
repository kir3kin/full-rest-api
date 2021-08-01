import { iContact } from "../interfaces/contacts"

export type iContactsActionTypes = 'FETCH_CONTACTS' | 'DEFAULT' | 'SHOW_LOADER' | 'HIDE_LOADER' | 'REMOVE_CONTACT' | 'ADD_CONTACT' | 'UPDATE_CONTACT' | 'FETCH_CONTACT'


export enum ActionType {
	FETCH_CONTACTS
}
// actions
export interface FetchContacts {
	type: ActionType.FETCH_CONTACTS,
	payload: iContact
}