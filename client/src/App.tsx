import React from 'react'
import './assets/scss/App.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ListContact } from './pages/ListContact'
import { AddContact } from './pages/AddContact'
import { EditContact } from './pages/EditContact'

export const App: React.FC = () => (
  <div className="container pt-3">
  <h1 className="text-center">Contact Manager</h1>
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