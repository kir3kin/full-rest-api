import React, { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { contactsContext } from "../context/contacts/contactsContext"
import { iContact } from "../interfaces/contacts"

export const EditContact: React.FC = () => {
	const state = useLocation<iContact>().state
	const [contact, setContact] = useState<iContact>(state)
	const { updateContact } = useContext(contactsContext)

	const sendForm = async (event: React.FormEvent) => {
    event.preventDefault()
    updateContact(contact)
  }

	const canUpdate = (): boolean => {
    return !!contact.name.trim() && !!contact.email.trim()
  }

	const inputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact(prev => ({
      ...prev,
      ...{[event.target.name]: event.target.value}
    }))
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
		</>
	)
}