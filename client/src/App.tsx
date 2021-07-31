import React, { useEffect, useState } from 'react'
import { Card } from './components/Card'
import { contactFuncType, iContact, iFormData } from './interfaces/cards'
import './assets/scss/App.scss'
import { request } from './API/contactsAPI'
import { CardLoader } from './components/CardLoader'

export const App: React.FC = () => {
  const [formData, setFormData] = useState<iFormData>({
    name: '',
    value: ''
  })
  const [contacts, setContacts] = useState<iContact[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    request('http://localhost:3048/api/contacts').then((allContacts: any) => {
      setContacts(allContacts)
      setLoading(false)
    })
  }, [])

  const canCreate = (): boolean => {
    return !!formData.name.trim() && !!formData.value.trim()
  }

  const inputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      ...{[event.target.name]: event.target.value}
    }))
  }
  
  const sendForm = async (event: React.FormEvent) => {
    event.preventDefault()

    await request('http://localhost:3048/api/contacts', 'POST', formData).then((nContact: any) => {
      setContacts(prev => ([
        ...prev,
        nContact
      ]))
    })
    setFormData(prev => ({name: '', value: ''}))
  }

  const markContact: contactFuncType = async id => {
    const contact = contacts.find(c => c._id === id)
    await request(`http://localhost:3048/api/contacts/${id}`, "PUT", {
      ...contact,
      marked: !contact!.marked
    }).then((newContact: any) => {
      setContacts(prev => prev.map(c => {
        if (c._id === newContact._id) c.marked = newContact.marked
        return c
      }))
    })
  }

  const removeContact: contactFuncType = async id => {
    await request(`http://localhost:3048/api/contacts/${id}`, "DELETE").then((data: any) => {
      console.log(data.message)
      setContacts(prev => prev.filter(c => c._id !== id))
    })
  }

  return (
    <div className="container pt-3">
      <h1>REST API</h1>
      <form
        onSubmit={event => sendForm(event)}
        className="form-inline mb-3"
      >
        <div className="form-group mr-5">
          <label htmlFor="name" className="mr-3">Name</label>
          <input
            value={formData.name}
            onChange={event => inputHandle(event)}
            id="name"
            name="name"
            type="text"
            className="form-control"
            />
        </div>
        <div className="form-group mr-5">
          <label htmlFor="value" className="mr-3">Value</label>
          <input
            value={formData.value}
            onChange={event => inputHandle(event)}
            id="value"
            name="value"
            type="text"
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!canCreate()}
        >Create</button>
      </form>

      {
        contacts.length ? (
          contacts.map(contact => {
            return <Card
              contact={contact}
              markContact={markContact}
              key={contact._id}
              removeContact={removeContact}
            />
          })
        ) : (loading ? <CardLoader /> : <p>There are no contacts!</p>)
      }
    </div>
  )
}