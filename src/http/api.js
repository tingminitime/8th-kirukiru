import http from './index'
import httpForm from './index-form'

// 會員登入
export const userSignIn = (data) => {
  return http.post('Login', data)
}

// 取得會員資訊
export const getUserInfo = () => {
  return http.get(`GetName`)
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
  return httpForm.post(`upload`, data)
}

// 添加切切文章
export const addKiruArticle = (data) => {
  return http.post(`api/Article/AddArticle`, data)
}

// 取得編輯切切文章資料
export const getEditKiruArticle = (id) => {
  return http.get(`api/Article/Geteditarticle?artId=${id}`)
}

// 編輯切切文章
export const editKiruArticle = (data) => {
  return http.post(`EditArticle`, data)
}

// 取得切切文章資料
export const getKiruArticle = (articleId) =>{
  return http.get(`api/Article/intoArticle?artId=${articleId}`)
}