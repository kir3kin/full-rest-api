import React, { useReducer } from "react"
import axios from 'axios'
import { contactsReducer } from "./contactsReduser"
import { contactsContext } from "./contactsContext"
import { iContact } from "../../interfaces/contacts"
import { iContactsState, loadingStatus } from "../../interfaces/contactsContext"
import { ActionType } from "../types/contactsTypes"
import { SERVER_LINK } from "../../utils/default"


export const ContactsState: React.FC = ({ children }) => {
	const initialContactsState: iContactsState = {
		contacts: [],
		contact: null,
		contactsStatus: 'idle',
		contactStatus: 'idle'
	}

	const [state, dispatch] = useReducer(contactsReducer, initialContactsState)

	const changeContactStatus = (status: loadingStatus) => dispatch({type: ActionType.CHANGE_CONTACT_STATUS, payload: status})
	const changeContactsStatus = (status: loadingStatus) => dispatch({type: ActionType.CHANGE_CONTACTS_STATUS, payload: status})

	const fetchContact = async (id: string) => {
		changeContactStatus('loading')
		try {
			const response = await axios.get<iContact>(`${SERVER_LINK}/${id}`)
			const payload = response.data
			dispatch({type: ActionType.FETCH_CONTACT, payload})
			changeContactStatus('idle')
		} catch(e) {
			changeContactStatus('failed')
			changeContactStatus('idle')
		}
	}
	
	const fetchContacts = async () => {
		changeContactsStatus('loading')
		await axios.get<iContact[]>(SERVER_LINK).then(response => {
			const payload = response.data
			dispatch({type: ActionType.FETCH_CONTACTS, payload})
			changeContactsStatus('idle')
		}).catch(e => {
			changeContactsStatus('failed')
		})
	}

	const updateContact = async (
		uContact: FormData, id: string
	) => {
		try {
			const nContact = await axios.put<iContact>(`${SERVER_LINK}/${id}`, uContact)
			const payload = nContact.data
			dispatch({type: ActionType.UPDATE_CONTACT, payload})
		} catch(e) {}
	}

	const addContact = async (aContact: FormData) => {
		try {
			const nContact = await axios.post<iContact>(SERVER_LINK, aContact)
			const payload = nContact.data
			dispatch({type: ActionType.ADD_CONTACT, payload})
		} catch(e) {}
	}

	const removeContact = async (id: string) => {
		try {
			await axios.delete(`${SERVER_LINK}/${id}`).then(() => {
				dispatch({type: ActionType.REMOVE_CONTACT, payload: id})
			})
		} catch(e) {}
	}

	return (
		<contactsContext.Provider value={{
			contacts: state.contacts,
			contact: state.contact,
			contactsStatus: state.contactsStatus,
			contactStatus: state.contactStatus,
			fetchContacts,
			fetchContact,
			removeContact,
			addContact,
			updateContact
		}}>
			{children}
		</contactsContext.Provider>
	)
}