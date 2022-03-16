import http from './index'

export const userLogin = (data) => {
  return http.post('api/login', data)
}

export const loginTest = (query) => {
  return http.get(`api/Member/Login?${query}`)
}

// 會員註冊 - 取得興趣清單
export const getInterestList = () => {
  return http.get(`api/Test/GetArticlecategory`)
}