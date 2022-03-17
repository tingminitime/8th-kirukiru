import http from './index'

// 會員登入
export const userSignIn = (data) => {
  return http.post('Login', data)
}

//會員註冊
export const userSignUp = (data) => {
  return http.post('api/Member/CreatMember', data)
}

// 會員註冊 - 取得興趣清單
export const getInterestList = () => {
  return http.get(`api/Test/GetArticlecategory`)
}