import React, { useContext } from "react"
import { iContact } from "../interfaces/contacts"
import { Trash, PencilSquare } from 'react-bootstrap-icons'
import { Link } from "react-router-dom"
import { contactsContext } from "../context/contacts/contactsContext"
import { alertContext } from "../context/alert/alertContext"
import { alertMessageType, alertText } from "../interfaces/alertContext"
import avatar from '../assets/images/avatar-placeholder.png'
import { SERVER_IMAGES } from "../utils/default"

export const ContactItem: React.FC<{contact: iContact}> = ({
	contact
}) => {
	const { removeContact } = useContext(contactsContext)
  const { show } = useContext(alertContext)

	const contactHandler = (id: string) => {
		try {
			removeContact(id)
			show(alertText.CONTACT_DELETE, alertMessageType.WARN)
		} catch(e) {
			show(alertText.CONTACT_DELETE_FAILED, alertMessageType.DANGER)
		}
	}

	const image = contact.image ? SERVER_IMAGES + contact.image : avatar

	return (
		<div className="card mb-3" key={contact._id}>
			<div className="card-body">
				<div className="row">
					<div className="col-9 d-flex flex-row align-items-center">
						<div className="contact-image me-3">
							<img src={image} className="w-100 h-100" alt="avatar" />
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
							to={`/edit-contact/${contact._id}`}
							className="btn btn-outline-primary border-0 d-flex align-items-center"
						><PencilSquare height="2em" width="2em" /></Link>
						<button
							className="btn btn-outline-danger border-0"
							onClick={() => contactHandler(contact._id)}
						><Trash height="2em" width="2em" /></button>
					</div>
				</div>
			</div>
		</div>
	)
}
