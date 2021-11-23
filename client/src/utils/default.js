const LOCALHOST = 'http://localhost:3040'

const HOST = (process.env.NODE_ENV === 'development') ? LOCALHOST : ''

export const SERVER_LINK = HOST + '/api/contacts'
export const SERVER_IMAGES = HOST + '/images/'
export const MAX_SIZE = 1 * 1024 * 1024 * 8