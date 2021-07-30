import React from "react"
import { contactFuncType, iContact } from "../interfaces/cards"

type contactProps = {
	contact: iContact
	markContact: contactFuncType
	removeContact: contactFuncType
}

export const Card: React.FC<contactProps> = ({ contact, markContact, removeContact }) => (
	<div className="card mb-3">
		<div className="card-body" key={contact.id}>
			<h5 className="card-title">{contact.name}</h5>
			<p className="card-text">{contact.value}</p>
			<button
				className="btn btn-primary"
				onClick={() => markContact(contact.id)}
			>Canceled</button>
			<button
				className="btn btn-danger"
				onClick={() => removeContact(contact.id)}
			>Delete</button>
		</div>
	</div>
)
