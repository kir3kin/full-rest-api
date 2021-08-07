import React, { useContext, useState } from "react"
import { alertContext } from "../context/alert/alertContext"
import { contactsContext } from "../context/contacts/contactsContext"
import { alertMessageType, alertText } from "../interfaces/alertContext"
import { iContact } from "../interfaces/contacts"

type editContactItemProps = {
	edContact: iContact
}

export const EditContactItem: React.FC<editContactItemProps> = ({
	edContact
}) => {
	const { updateContact } = useContext(contactsContext)
	const { show } = useContext(alertContext)
	const [contact, setContact] = useState<iContact>(edContact)

	const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
		try {
			updateContact(contact)
			show(alertText.CONTACT_UPDATE, alertMessageType.SUCCESS)
		} catch(e) {
			show(alertText.CONTACT_UPDATE_FAILED, alertMessageType.DANGER)
		}
  }

	const inputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setContact(prev => ({
			...prev,
      ...{[event.target.name]: event.target.value}
    }))
  }

	// some kind of validation
	const canUpdate = (): boolean => {
		return !!contact.name.trim() &&
		!!contact.email.trim() &&
		(
			contact.name !== edContact.name ||
			contact.email !== edContact.email
		) &&
		(contact.name.length <= 20)
	}
	return (
		<>
		<form
			onSubmit={event => submitHandler(event)}
			className=""
		>
			<div className="form-floating mb-3">
				<input
					value={contact.name}
					onChange={event => inputHandle(event)}
					id="name"
					name="name"
					type="text"
					className="form-control"
				/>
				<label htmlFor="name">Name</label>
			</div>
			<div className="form-floating mb-3">
				<input
					value={contact.email}
					onChange={event => inputHandle(event)}
					id="email"
					name="email"
					type="text"
					className="form-control"
				/>
				<label htmlFor="email">Email</label>
			</div>
			<button
				type="submit"
				className="btn btn-primary px-3"
				disabled={!canUpdate()}
			>Update</button>
		</form>
		</>
	)
}