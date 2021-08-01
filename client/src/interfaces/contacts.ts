export interface iContactsState {
  contacts: iContact[]
  loading: boolean
}

export interface iContactContext {
  contacts: iContact[]
  loading: boolean
  fetchContacts: () => void
  removeContact: (id: string) => void
  addContact: (nContact: iContactShort) => void
  updateContact: (uContact: iContact) => void
  fetchContactById: (id: string) => any
}

export interface iContactShort {
  name: string
  email: string
}

export interface iContact extends iContactShort {
  _id: string
}