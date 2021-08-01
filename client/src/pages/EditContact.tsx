import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { ContactsLoader } from "../components/ContactsLoader"
import { contactsContext } from "../context/contacts/contactsContext"
import { iContact } from "../interfaces/contacts"

export const EditContact: React.FC = () => {
	const [contact, setContact] = useState<iContact>({
		_id: '',
		name: '',
		email: ''
	})
	
	const {id: contactId} = useParams<{id: string}>()
	const history = useHistory()
	const { updateContact, fetchContactById } = useContext(contactsContext)
		
	useEffect(() => {
		fetchContactById(contactId).then((contact: iContact) => {
			setContact(contact)
		})
	}, [])

	const sendForm = async (event: React.FormEvent) => {
    event.preventDefault()
    updateContact(contact)
		history.push('/')
  }
	
	const inputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setContact(prev => ({
			...prev,
      ...{[event.target.name]: event.target.value}
    }))
  }
	
	const canUpdate = (): boolean => {
		return !!contact.name.trim() && !!contact.email.trim()
	}
	return (
		<>
			<div className="row">
				<h2 className="col-6 mb-0">Edit contact</h2>
				<div className="col-6 d-flex justify-content-end">
					<Link to='/' className="btn px-3 btn-danger">Back</Link>
				</div>
			</div>
			<hr className="my-4" />
			
			{contact ? (
				<form
					onSubmit={event => sendForm(event)}
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
			) : <ContactsLoader />}
		</>
	)
}