import http from './index'

// 會員登入
export const userSignIn = (data) => {
  return http.post('Login', data)
}

// 取得會員資訊
export const getUserInfo = (token) => {
  return http.get(`api/Test/GetName?Token=${token}`)
}

//會員註冊
export const userSignUp = (data) => {
  return http.post('api/Member/CreatMember', data)
}

// 會員註冊 - 取得文章類別清單
export const getInterestList = () => {
  return http.get(`api/Test/GetArticlecategory`)
}