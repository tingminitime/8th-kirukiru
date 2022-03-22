import http from './index'
import httpForm from './index-form'

// 會員登入
export const userSignIn = (data) => {
  return http.post('Login', data)
}

// 取得會員資訊
// export const getUserInfo = (token) => {
//   return http.get(`api/Test/GetName?Token=${token}`)
// }

// 取得會員資訊
export const getUserInfo = () => {
  return http.get(`/GetName`)
}

//會員註冊
export const userSignUp = (data) => {
  return http.post('api/Member/CreatMember', data)
}

// 會員註冊 - 取得文章類別清單
export const getInterestList = () => {
  return http.get(`api/Test/GetArticlecategory`)
}

// 圖片上傳
export const uploadImage = (data) => {
  return httpForm.post(`/upload`, data)
}

// 添加切切文章
export const addKiruArticle = (data) => {
  return http.post(`api/Article/AddArticle`, data)
}