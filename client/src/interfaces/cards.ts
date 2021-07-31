export interface iFormData {
  name: string
  value: string
}

export interface iContact extends iFormData {
  _id: string
  marked: boolean
}

export type contactFuncType = (id: string) => void