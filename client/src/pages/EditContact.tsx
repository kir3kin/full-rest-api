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
				<h2 className="col-sm-6 mb-sm-0 mb-4 text-center text-sm-start">Edit contact</h2>
				<div className="col-sm-6 mb-sm-0 mb-2 d-flex justify-content-center justify-content-sm-end">
					<button
						onClick={() => { history.goBack() }}
						className="btn btn-danger px-sm-3 py-2 py-sm-1 px-4"
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