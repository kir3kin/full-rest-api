import React, { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { alertContext } from "../context/alert/alertContext"
import { contactsContext } from "../context/contacts/contactsContext"
import { alertMessageType, alertText } from "../interfaces/alertContext"
import { iContactShort } from "../interfaces/contacts"

export const AddContact: React.FC = () => {
  const { addContact } = useContext(contactsContext)
  const { show } = useContext(alertContext)
  const history = useHistory()

  const defaultFormData = {
    name: '',
    email: ''
  }

	const [formData, setFormData] = useState<iContactShort>(defaultFormData)

	const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      addContact(formData)
      show(alertText.CONTACT_ADD, alertMessageType.SUCCESS)
    } catch (e) {
      show(alertText.CONTACT_ADD_FAILED, alertMessageType.DANGER)
    }
    setFormData(defaultFormData)
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
        <button
          className="btn px-3 btn-danger"
          onClick={() => { history.goBack() }}
        >Back</button>
      </div>
		</div>
    <hr className="my-4" />
		<form
        onSubmit={event => submitHandler(event)}
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
            type="email"
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