// const baseURL = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_APP_API
const baseURL = '/api'
const timeout = 15000
const headers = {
  'Content-Type': 'application/json'
}

export default {
  baseURL,
  timeout,
  headers,
}