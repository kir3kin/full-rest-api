import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { Card } from './components/Card'
import { contactFuncType, iContact, iFormData } from './interfaces/cards'
import './App.css'

export const App: React.FC = () => {
  const [formData, setFormData] = useState<iFormData>({
    name: '',
    value: ''
  })
  const [contacts, setContacts] = useState<iContact[]>([])

  const inputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      ...{[event.target.name]: event.target.value}
    }))
  }
  
  const sendForm = (event: React.FormEvent) => {
    event.preventDefault()
    if (formData.name && formData.value) {
      setContacts(prev => ([
        ...prev,
        {
          id: nanoid(),
          marked: false,
          ...formData
        }
      ]))
      setFormData(prev => ({name: '', value: ''}))
    }
  }

  const markContact: contactFuncType = id => {
    setContacts(prev => prev.map(contact => {
      if (contact.id === id) contact.marked = !contact.marked
      return contact
    }))
  }

  const removeContact: contactFuncType = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id))
  }

  // console.log('contacts:', contacts)

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
        <button type="submit" className="btn btn-primary">Create</button>
      </form>

        {!contacts.length && <p>There are no contacts!</p>}
        {contacts.map(contact => {
          return <Card
            contact={contact}
            markContact={markContact}
            key={contact.id}
            removeContact={removeContact}
          />
        })}
    </div>
  )
}