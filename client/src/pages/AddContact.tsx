import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { alertContext } from "../context/alert/alertContext"
import { contactsContext } from "../context/contacts/contactsContext"
import { alertMessageType, alertText } from "../interfaces/alertContext"
import { iContactShort } from "../interfaces/contacts"
import { MAX_SIZE } from "../utils/default"

export const AddContact: React.FC = () => {
  const { addContact } = useContext(contactsContext)
  const { show } = useContext(alertContext)
  const history = useHistory()

  const defaultContact = {
    name: '',
    email: '',
    image: ''
  }
  const defaultFileName = 'Chose image'
  
	const [contact, setFormContact] = useState<iContactShort>(defaultContact)
  const [fileName, setFileName] = useState<string>('')

	const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    if (typeof contact.image === 'object') {
			if (!(/^image\/(jpe?g|png)$/.test(contact.image.type))) {
				show(alertText.CONTACT_IMAGE_TYPE, alertMessageType.DANGER)
				return
			}
			if (contact.image.size > MAX_SIZE) {
				show(alertText.CONTACT_IMAGE_SIZE, alertMessageType.DANGER)
				return
			}
		}

    try {
      const sendData = new FormData()
      sendData.append('name', contact.name)
      sendData.append('email', contact.email)
      sendData.append('image', contact.image)
      addContact(sendData)

      show(alertText.CONTACT_ADD, alertMessageType.SUCCESS)
      history.push('/')
    } catch (e) {
      show(alertText.CONTACT_ADD_FAILED, alertMessageType.DANGER)
    }
  }
    
	const canCreate = (): boolean => {
    return !!contact.name.trim() &&
      !!contact.email.trim() &&
      (contact.name.length <= 20)
  }

	const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value: string | File | null

    if (event.target.type === 'file') {
      value = event.target.files![0] ? event.target.files![0] : ''
      if (value) setFileName(event.target.files![0].name)
      else setFileName(defaultFileName)
    } else value = event.target.value

    setFormContact(prev => ({
      ...prev,
      ...{[event.target.name]: value}
    }))
  }

	return (
		<>
		<div className="row">
			<h2 className="col-sm-6 mb-sm-0 mb-4 text-center text-sm-start">Add contact</h2>
			<div className="col-sm-6 mb-sm-0 mb-2 d-flex justify-content-center justify-content-sm-end">
        <button
          className="btn px-sm-3 py-2 py-sm-1 px-4 btn-danger"
          onClick={() => { history.goBack() }}
        >Back</button>
      </div>
		</div>
    <hr className="my-4" />
		<form
        onSubmit={submitHandler}
        className="custom-form mb-4 text-sm-start text-center"
      >
        <div>
          <div className="form-floating mb-3">
            <input
              value={contact.name}
              onChange={inputHandler}
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
              onChange={inputHandler}
              id="email"
              name="email"
              type="email"
              className="form-control"
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="custom-file mb-3">
          <input
            onChange={inputHandler}
            id="image"
            name="image"
            type="file"
            className="custom-file__input"
          />
          <label
            htmlFor="image"
            className="custom-file__label text-start mb-2 mb-sm-0"
          >{fileName.length > 0 ? fileName : defaultFileName}</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary px-sm-3 py-2 py-sm-1 px-4 text-center"
          disabled={!canCreate()}
        >Add</button>
      </form>
		</>
	)
}