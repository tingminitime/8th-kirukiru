import http from './index'

export const userLogin = (data) => {
  return http.post('api/login', data)
}

export const loginTest = (query) => {
  return http.get(`api/Member/Login?${query}`)
}