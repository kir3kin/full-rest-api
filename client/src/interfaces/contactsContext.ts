import { iContact, iContactShort } from "./contacts";

export interface iContactsState {
  contacts: iContact[]
  editContact: iContact
  loading: boolean
}

export interface iContactContext extends iContactsState {
  fetchContacts: () => void
  removeContact: (id: string) => void
  addContact: (nContact: iContactShort) => void
  updateContact: (uContact: iContact) => void
}