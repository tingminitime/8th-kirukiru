import http from './index'

export const userLogin = (data) => {
  return http.post('api/login', data)
}

export const apiTest = () => {
  return http.get('https://nodejs-todolist-sample.herokuapp.com/todos')
}