import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { ContactItem } from "../components/ContactItem"
import { ContactsLoader } from "../components/ContactsLoader"
import { contactsContext } from "../context/contacts/contactsContext"
import '../assets/scss/Contact.scss'

export const ListContact: React.FC = () => {
  const { contacts, contactsStatus: status, fetchContacts } = useContext(contactsContext)

  useEffect(() => {
    fetchContacts()
  }, [])

	return (
		<>
      <div className="row">
        <h2 className="col-6 mb-0">Contact List</h2>
        <div className="col-6 d-flex justify-content-end">
          <Link to='/add-contact' className="btn px-4 btn-primary">Add Contact</Link>
        </div>
      </div>
      <hr className="my-4" />
			
			{status === 'failed' && (<p>Cannot get contacts!</p>)}
			{status === 'loading' && <ContactsLoader />}
			{status === 'idle' && ( contacts.length ? (
					<TransitionGroup>
						{contacts.map(contact => {
							return (
								<CSSTransition
									key={contact._id}
									timeout={400}
									classNames={'contact-item'}
								>
									<ContactItem
									contact={contact}
									/>
								</CSSTransition>
							)
						})}
					</TransitionGroup>
				) : (
					<p>There are no contacts!</p>
				)
			)}
		</>
	)
}