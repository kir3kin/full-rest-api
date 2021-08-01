import React, { useReducer } from "react"
import { contactsReducer } from "./contactsReduser"
import { contactsContext } from "./contactsContext"
import { iContact, iContactShort, iContactsState } from "../../interfaces/contacts"
import axios from 'axios'

export const ContactsState: React.FC = ({ children }) => {
	const initialContactsState: iContactsState = {
		contacts: [],
		loading: false
	}

	const [state, dispatch] = useReducer(contactsReducer, initialContactsState)

	const showLoader = () => dispatch({type: 'SHOW_LOADER'})
	const hideLoader = () => dispatch({type: 'HIDE_LOADER'})

	// add actions interfaces
	const fetchContacts = async () => {
		showLoader()
		await axios.get('http://localhost:3048/api/contacts').then(result => {
			const payload = result.data
			dispatch({type: 'FETCH_CONTACTS', payload})
			hideLoader()
		})
	}

	const fetchContactById = async(id: string) => {
		const contact = await axios.get(`http://localhost:3048/api/contacts/${id}`).then(result => {
			const payload = result.data
			dispatch({type: 'FETCH_CONTACT', payload})
			return payload
		})
		return contact
	}

	const updateContact = async (uContact: iContact) => {
		const res = await axios.put(`http://localhost:3048/api/contacts/${uContact._id}`, uContact)
		const payload = res.data 
		dispatch({type: "UPDATE_CONTACT", payload})
	}

	const addContact = async (nContact: iContactShort) => {
		const res = await axios.post('http://localhost:3048/api/contacts', nContact)
		const payload = res.data
		dispatch({type: "ADD_CONTACT", payload})
	}

	const removeContact = async (id: string) => {
		await axios.delete(`http://localhost:3048/api/contacts/${id}`).then(() => {
			dispatch({
				type: 'REMOVE_CONTACT',
				payload: id
			})
		})
	}


	return (
		<contactsContext.Provider value={{
			contacts: state.contacts,
			loading: state.loading,
			fetchContacts,
			removeContact,
			addContact,
			updateContact,
			fetchContactById
		}}>
			{children}
		</contactsContext.Provider>
	)
}