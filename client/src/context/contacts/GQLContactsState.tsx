import React, { useReducer } from "react"
import axios from 'axios'
import { contactsReducer } from "./contactsReduser"
import { contactsContext } from "./contactsContext"
import { iContact, iContactShort } from "../../interfaces/contacts"
import { iContactsState } from "../../interfaces/contactsContext"
import { ActionType } from "../types/contactsTypes"
import { AxiosParamsType } from "../../interfaces/gqlContactsContext"
import {
	createContactQuery,
	deleteContactQuery,
	getContactsQuery,
	updateContactQuery
} from "./gqlQueries"
import {
	createContactDataType,
	deleteContactDataType,
	getContactsDataType,
	updateContactDataType
} from "../../interfaces/gqlContactsDataTypes"

const SERVERS = {
	'LOCALHOST': 'http://localhost:3040/api/gqlContacts',
	'HTTPS':     'https://kir3kin.pp.ua:3043/api/gqlContacts'
}

const axiosParams: AxiosParamsType = {
	url: SERVERS['HTTPS'],
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	}
}

export const GQLContactsState: React.FC = ({ children }) => {
	const initialContactsState: iContactsState = {
		contacts: [],
		loading: false
	}

	const [state, dispatch] = useReducer(contactsReducer, initialContactsState)

	const showLoader = () => dispatch({type: ActionType.SHOW_LOADER})
	const hideLoader = () => dispatch({type: ActionType.HIDE_LOADER})

	const fetchContacts = async () => {
		showLoader()

		await axios({
			...axiosParams,
			data: { query: getContactsQuery }
		}).then((response: getContactsDataType) => {
			const payload = response.data.data.contacts
			dispatch({type: ActionType.FETCH_CONTACTS, payload})
			hideLoader()
		})
	}

	const addContact = async (aContact: iContactShort) => {
		await axios({
			...axiosParams,
			data: {
				query: createContactQuery,
				variables: {input: {...aContact}}
			}
		}).then((response: createContactDataType) => {
			const payload = response.data.data.createContact
			dispatch({type: ActionType.ADD_CONTACT, payload})
		})
	}

	const updateContact = async (uContact: iContact) => {
		const input: iContactShort = {
			name: uContact.name,
			email: uContact.email
		}
		await axios({
			...axiosParams,
			data: {
				query: updateContactQuery,
				variables: {
					id: uContact._id,
					input
				}
			}
		}).then((response: updateContactDataType) => {
			const payload = response.data.data.updateContact
			dispatch({type: ActionType.UPDATE_CONTACT, payload})
		})
	}

	const removeContact = async (id: string) => {
		await axios({
			...axiosParams,
			data: {
				query: deleteContactQuery,
				variables: {id}
			}
		}).then((response: deleteContactDataType) => {
			const payload = response.data.data.deleteContact._id
			dispatch({type: ActionType.REMOVE_CONTACT, payload})
		})
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