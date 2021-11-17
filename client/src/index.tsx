import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { AlertState } from './context/alert/AlertState'
import { ContactsState } from './context/contacts/ContactsState'
// import { GQLContactsState } from './context/contacts/GQLContactsState'
import './assets/scss/index.scss'

render(
  <ContactsState>
    {/* <GQLContactsState> */}
    <AlertState>
      <App />
    </AlertState>
    {/* </GQLContactsState>, */}
  </ContactsState>,
  document.getElementById('root')
)