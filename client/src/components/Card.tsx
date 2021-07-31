import React, { useState } from "react"
import { contactFuncType, iContact } from "../interfaces/cards"

type contactProps = {
	contact: iContact
	markContact: contactFuncType
	removeContact: contactFuncType
}

export const Card: React.FC<contactProps> = ({
	contact,
	markContact,
	removeContact
}) => {

	const titleClasses = ['card-title']
	if (contact.marked) titleClasses.push('marked')

	return (
		<div className="card mb-3">
			<div className="card-body" key={contact.id}>
				<h5
					className={titleClasses.join(' ')}
				>{contact.name}</h5>
				<p className="card-text">{contact.value}</p>
				<button
					className="btn btn-primary"
					onClick={() => markContact(contact.id)}
				>Mark</button>
				<button
					disabled={contact.marked}
					className="btn btn-danger"
					onClick={() => removeContact(contact.id)}
				>Delete</button>
			</div>
		</div>
	)
}
