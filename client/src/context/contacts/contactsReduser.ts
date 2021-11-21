import { iContactsState } from "../../interfaces/contactsContext"
import { ActionType, ContactsActions } from "../types/contactsTypes"

export const contactsReducer = (
	state: iContactsState,
	action: ContactsActions
): iContactsState => {
	switch (action.type) {
		case ActionType.FETCH_CONTACTS: {
			return { ...state, contacts: action.payload }
		}
		case ActionType.FETCH_CONTACT: {
			return { ...state, contact: action.payload }
		}
		case ActionType.ADD_CONTACT: {
			return {
				...state,
				contacts: [
					...state.contacts,
					action.payload
				]
			}
		}
		case ActionType.REMOVE_CONTACT: {
			return {
				...state,
				contacts: state.contacts.filter(contact => contact._id !== action.payload)
			}
		}
		case ActionType.UPDATE_CONTACT: {
			return {
				...state,
				contacts: state.contacts.map(contact => {
					if (contact._id === action.payload._id)
						return { ...contact, ...action.payload }
					return contact
				})
			}
		}
		case ActionType.CHANGE_CONTACT_STATUS: {
			return { ...state, contactStatus: action.payload }
		}
		case ActionType.CHANGE_CONTACTS_STATUS: {
			return { ...state, contactsStatus: action.payload }
		}
		default: return state
	}
}