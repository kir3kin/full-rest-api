import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import './assets/scss/index.scss'
import { ContactsState } from './context/contacts/ContactsState'

render(
  <ContactsState>
    <App />
  </ContactsState>,
  document.getElementById('root')
)