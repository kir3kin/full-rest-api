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
		case ActionType.SHOW_LOADER: {
			return { ...state, loading: true }
		}
		case ActionType.HIDE_LOADER: {
			return { ...state, loading: false }
		}
		default: return state
	}
}