import { iContactsState } from "../../interfaces/contacts"
import { iContactsActionTypes } from "../types"

type actionType = {
	type: iContactsActionTypes
	payload?: any
}

type actionFuncType = (state: iContactsState, action: actionType) => any
type handlersType = Record<iContactsActionTypes, actionFuncType>

const handlers: handlersType = {
	FETCH_CONTACTS: (state, {payload}) => ({...state, contacts: payload}),
	FETCH_CONTACT: (state, {payload}) => ({...state, contacts: [payload]}),
	ADD_CONTACT: (state, {payload}) => ({
		contacts: [
			...state.contacts,
			payload
		]
	}),
	REMOVE_CONTACT: (state, {payload}) => ({
		...state,
		contacts: state.contacts.filter(contact => contact._id !== payload)
	}),
	UPDATE_CONTACT: (state, {payload}) => {
		return {
			...state,
			contacts: [
			// change into map
			...state.contacts.filter(contact => contact._id !== payload._id),
			{...state.contacts.find(contact => contact._id === payload._id), ...payload}
		]
		}
	},
	SHOW_LOADER: (state) => ({...state, loading: true}),
	HIDE_LOADER: (state) => ({...state, loading: false}),
	DEFAULT: state => state
}

type contactsReduserType = (state: iContactsState, action: actionType) => any

export const contactsReducer: contactsReduserType = (state, action) => {
	const handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}