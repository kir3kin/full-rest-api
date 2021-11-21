import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ContactsLoader } from "../components/ContactsLoader"
import { EditContactItem } from "../components/EditContactItem"
import { contactsContext } from "../context/contacts/contactsContext"

export const EditContact: React.FC = () => {
	const history = useHistory()
	const {id: contactId} = useParams<{id: string}>()

	const { contactStatus: status, contact, fetchContact } = useContext(contactsContext)

	useEffect(() => {
		fetchContact(contactId)
  }, [])

	if (status === 'failed') history.goBack()

	return (
		<>
			<div className="row">
				<h2 className="col-6 mb-0">Edit contact</h2>
				<div className="col-6 d-flex justify-content-end">
					<button
						onClick={() => { history.goBack() }}
						className="btn px-3 btn-danger"
					>Back</button>
				</div>
			</div>
			<hr className="my-4" />
			{status === 'loading' && <ContactsLoader />}
			{status === 'idle' && contact !== null && (
				<EditContactItem
					edContact={contact}
					id={contactId}
				/>
			)}
		</>
	)
}