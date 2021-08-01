import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { request } from "../API/contactsAPI"
import { Contact } from "../components/Contact"
import { ContactsLoader } from "../components/ContactsLoader"
import { contactsContext } from "../context/contacts/contactsContext"
import { contactFuncType } from "../interfaces/contacts"

export const ListContact: React.FC = () => {

  const {contacts, loading, fetchContacts} = useContext(contactsContext)
  
  useEffect(() => {
    fetchContacts()
  }, [])

	const markContact: contactFuncType = async id => {
    const contact = contacts.find(c => c._id === id)
    await request(`http://localhost:3048/api/contacts/${id}`, "PUT", {
      ...contact,
    }).then((newContact: any) => {
      // setContacts(prev => prev.map(c => {
      //   if (c._id === newContact._id) c.marked = newContact.marked
      //   return c
      // }))
    })
  }

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
						return <Contact
							contact={contact}
							markContact={markContact}
							key={contact._id}
						/>
					})
				) : (loading ? <ContactsLoader /> : <p>There are no contacts!</p>)
			}
		</>
	)
}