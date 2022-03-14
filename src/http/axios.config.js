const baseURL = import.meta.env.VITE_APP_API
const timeout = 15000
const headers = {
  'Content-Type': 'application/json'
}

export default {
  baseURL,
  timeout,
  headers,
}