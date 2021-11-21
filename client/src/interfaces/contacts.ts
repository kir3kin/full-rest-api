export interface iContactShort {
  name: string
  email: string
  image: string | Blob
}

export interface iContact extends iContactShort {
  _id: string
}