import React, { useReducer } from "react"
import axios from 'axios'
import { contactsReducer } from "./contactsReduser"
import { contactsContext } from "./contactsContext"
import { iContact, iContactShort } from "../../interfaces/contacts"
import { iContactsState } from "../../interfaces/contactsContext"
import { ActionType } from "../types/contactsTypes"
import { SERVER_LINK } from "../../utils/default"


export const ContactsState: React.FC = ({ children }) => {
	const initialContactsState: iContactsState = {
		contacts: [],
		loading: false
	}

	const [state, dispatch] = useReducer(contactsReducer, initialContactsState)

	const showLoader = () => dispatch({type: ActionType.SHOW_LOADER})
	const hideLoader = () => dispatch({type: ActionType.HIDE_LOADER})

	const fetchContacts = async () => {
		showLoader()
		await axios.get<iContact[]>(SERVER_LINK).then(response => {
			const payload = response.data
			dispatch({type: ActionType.FETCH_CONTACTS, payload})
			
			hideLoader()
		})
	}

	const updateContact = async (uContact: iContact) => {
		try {
			const nContact = await axios.put<iContact>(`${SERVER_LINK}/${uContact._id}`, uContact)
			const payload = nContact.data
			dispatch({type: ActionType.UPDATE_CONTACT, payload})
		} catch(e) {
			// throw new Error(e)
		}
	}

	const addContact = async (aContact: iContactShort) => {
		try {
			const nContact = await axios.post<iContact>(SERVER_LINK, aContact)
			const payload = nContact.data
			dispatch({type: ActionType.ADD_CONTACT, payload})
		} catch(e) {
			// throw new Error(e)
		}
	}

	const removeContact = async (id: string) => {
		try {
			await axios.delete(`${SERVER_LINK}/${id}`).then(() => {
				dispatch({type: ActionType.REMOVE_CONTACT, payload: id})
			})
		} catch(e) {
			// throw new Error(e)
		}
	}

	return (
		<contactsContext.Provider value={{
			contacts: state.contacts,
			loading: state.loading,
			fetchContacts,
			removeContact,
			addContact,
			updateContact
		}}>
			{children}
		</contactsContext.Provider>
	)
}