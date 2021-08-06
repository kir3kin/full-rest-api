import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { ContactItem } from "../components/ContactItem"
import { ContactsLoader } from "../components/ContactsLoader"
import { contactsContext } from "../context/contacts/contactsContext"

export const ListContact: React.FC = () => {

  const { contacts, loading } = useContext(contactsContext)

  	// console.log('contacts:', contacts)

	return (
		<>
      <div className="row">
        <h2 className="col-6 mb-0">Contact List</h2>
        <div className="col-6 d-flex justify-content-end">
          <Link to='/add-contact' className="btn px-4 btn-primary">Add Contact</Link>
        </div>
      </div>
      <hr className="my-4" />
			{
				contacts.length ? (
					contacts.map(contact => {
						return <ContactItem
							contact={contact}
							key={contact._id}
						/>
					})
				) : (loading ? <ContactsLoader /> : <p>There are no contacts!</p>)
			}
		</>
	)
}