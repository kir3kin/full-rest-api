export interface iFormData {
  name: string
  value: string
}

export interface iContact extends iFormData {
  id: string
  marked: boolean
}

export type contactFuncType = (id: string) => void

// useReducer and useContext