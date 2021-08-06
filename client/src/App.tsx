import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ListContact } from './pages/ListContacts'
import { AddContact } from './pages/AddContact'
import { EditContact } from './pages/EditContact'
import { contactsContext } from './context/contacts/contactsContext'
import './assets/scss/App.scss'
import { Alert } from './components/Alert'

export const App: React.FC = () => {
  const { fetchContacts } = useContext(contactsContext)
  
  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <div className="container pt-3">
    <h1 className="text-center">Contact Manager</h1>
    <Alert />
    <hr className="my-4" />
      <BrowserRouter>
        <Switch>
          <Route component={ListContact} path="/" exact />
          <Route component={AddContact} path="/add-contact" />
          <Route component={EditContact} path="/edit-contact/:id" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}