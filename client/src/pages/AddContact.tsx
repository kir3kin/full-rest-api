import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { contactsContext } from "../context/contacts/contactsContext"
import { iContactShort } from "../interfaces/contacts"

export const AddContact: React.FC = () => {
  const { addContact } = useContext(contactsContext)

	const [formData, setFormData] = useState<iContactShort>({
    name: '',
    email: ''
  })

	const sendForm = async (event: React.FormEvent) => {
    event.preventDefault()
    addContact(formData)
    setFormData(prev => ({name: '', email: ''}))
  }

	const canCreate = (): boolean => {
    return !!formData.name.trim() && !!formData.email.trim()
  }

	const inputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      ...{[event.target.name]: event.target.value}
    }))
  }

	return (
		<>
		<div className="row">
			<h2 className="col-6 mb-0">Add contact</h2>
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
            value={formData.name}
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
            value={formData.email}
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
          disabled={!canCreate()}
        >Add</button>
      </form>
		</>
	)
}