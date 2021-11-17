import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { AlertState } from './context/alert/AlertState'
import { ContactsState } from './context/contacts/ContactsState'
import './assets/scss/index.scss'

render(
  <ContactsState>
    <AlertState>
      <App />
    </AlertState>
  </ContactsState>,
  document.getElementById('root')
)