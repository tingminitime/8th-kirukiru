const baseURL = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_APP_API
// const baseURL = '/api'
const timeout = 20000
const headers = {
  'Content-Type': 'multipart/form-data'
}

export default {
  baseURL,
  timeout,
  headers,
}