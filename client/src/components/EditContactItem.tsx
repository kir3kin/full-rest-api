import React, { useContext, useState } from "react"
import { alertContext } from "../context/alert/alertContext"
import { contactsContext } from "../context/contacts/contactsContext"
import { alertMessageType, alertText } from "../interfaces/alertContext"
import { iContact } from "../interfaces/contacts"
import { MAX_SIZE, SERVER_IMAGES } from "../utils/default"
import { useHistory } from "react-router"
import placeholderImg from "../assets/images/avatar-placeholder.png"

type editContactItemProps = {
	edContact: iContact
	id: string
}

type imageFile = {
  path: string
  display: boolean
}

export const EditContactItem: React.FC<editContactItemProps> = ({
	edContact,
	id
}) => {
	const history = useHistory()
	const { updateContact } = useContext(contactsContext)
	const { show } = useContext(alertContext)
	const [contact, setContact] = useState<iContact>(edContact)

	// image
	const defaultFileName = 'Choose image'
	const defaultImage = {
		display: true,
    path: contact.image ? SERVER_IMAGES + contact.image : placeholderImg
  }

	const [image, setImage] = useState<imageFile>(defaultImage)
	const [fileName, setFileName] = useState<string | Blob>(contact.image)
	// image

	const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

		if (
      (typeof contact.image === 'object') &&
      (contact.image.size > MAX_SIZE)
    ) { 
      show(alertText.CONTACT_IMAGE, alertMessageType.DANGER)
      return
    }

		try {
			const sendData = new FormData()
      sendData.append('name', contact.name)
      sendData.append('email', contact.email)
      sendData.append('image', contact.image)
			updateContact(sendData, id)
			show(alertText.CONTACT_UPDATE, alertMessageType.SUCCESS)
			history.push('/')
		} catch(e) {
			show(alertText.CONTACT_UPDATE_FAILED, alertMessageType.DANGER)
		}
  }

	const inputHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		let value: string | File | null

    if (event.target.type === 'file') {
      value = event.target.files![0] ? event.target.files![0] : ''

      if (value) {
				setImage({ ...image, display: false })
				setFileName(event.target.files![0].name)
			}
      else setFileName(defaultFileName)
    } else value = event.target.value

		setContact(prev => ({
			...prev,
      ...{[event.target.name]: value}
    }))
  }

	// some kind of validation
	const canUpdate = (): boolean => {
		return !!contact.name.trim() &&
		!!contact.email.trim() &&
		(
			contact.name !== edContact.name ||
			contact.email !== edContact.email ||
			contact.image !== edContact.image
		) &&
		(contact.name.length <= 20)
	}

	return (
		<>
		<form
			onSubmit={submitHandler}
		>
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
					type="text"
					className="form-control"
				/>
				<label htmlFor="email">Email</label>
			</div>
			<div className="custom-file mb-3">
				<input
					onChange={inputHandler}
					id="image"
					name="image"
					type="file"
					className="custom-file__input"
				/>
				{image.display && (
					<img
						src={image.path}
						alt="contact"
					/>
				)}
				<label
					htmlFor="image"
					className="custom-file__label"
				>{fileName ? fileName : defaultFileName}</label>
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