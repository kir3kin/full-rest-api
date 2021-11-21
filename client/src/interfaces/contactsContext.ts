import { iContact } from "./contacts";

export type loadingStatus = 'idle' | 'loading' | 'failed'

export interface iContactsState {
  contacts: iContact[]
  contact: iContact | null
  contactsStatus: loadingStatus
  contactStatus: loadingStatus
}

export interface iContactContext extends iContactsState {
  fetchContacts: () => void
  fetchContact: (id: string) => void
  removeContact: (id: string) => void
  addContact: (nContact: FormData) => void
  updateContact: (uContact: FormData, id: string) => void
}