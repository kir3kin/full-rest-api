import React, { useContext } from "react"
import { contactFuncType, iContact } from "../interfaces/contacts"
import { Trash, PencilSquare } from 'react-bootstrap-icons'
import { Link } from "react-router-dom"
import avatar from '../assets/images/avatar-placeholder.png'
import '../assets/scss/Contact.scss'
import { contactsContext } from "../context/contacts/contactsContext"

type contactProps = {
	contact: iContact
	markContact: contactFuncType
}

export const Contact: React.FC<contactProps> = ({
	contact,
	markContact
}) => {

	const {removeContact} = useContext(contactsContext)

	return (
		<div className="card mb-3" key={contact._id}>
			<div className="card-body">
				<div className="row">
					<div className="col-9 d-flex flex-row align-items-center">
						<div className="contact-image me-3">
							<img src={avatar} className="w-100 h-100" alt="avatar" />
						</div>
						<div>
							<h5
								className="card-title"
							>{contact.name}</h5>
							<p className="card-text fw-bolder email-blue">{contact.email}</p>
						</div>
					</div>
					<div className="col-3 d-flex flex-row justify-content-end">
						<Link
							to={{
								pathname: "/edit-contact",
								state: contact
							}}
							className="btn btn-outline-primary border-0 d-flex align-items-center"
						><PencilSquare height="2em" width="2em" /></Link>
						<button
							className="btn btn-outline-danger border-0"
							onClick={() => removeContact(contact._id)}
						><Trash height="2em" width="2em" /></button>
					</div>
				</div>
			</div>
		</div>
	)
}
