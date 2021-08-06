export interface iContactShort {
  name: string
  email: string
}

export interface iContact extends iContactShort {
  _id: string
}