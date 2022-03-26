import http from './index'
import httpForm from './index-form'

// 物件轉 params
const parseParams = (params) => {
  if (typeof params !== 'object') return false
  let urlEncode = ''
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' || typeof value === 'number') {
      urlEncode += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
    } else if (Array.isArray(value)) {
      value.forEach(val => {
        urlEncode += `${encodeURIComponent(key)}=${encodeURIComponent(val)}&`
      })
    } else {
      continue
    }
  }
  return urlEncode
}

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

// 取得文章所有留言
export const getArticleMessage = (params) =>{
  return http.get(`api/Article/GetAllMessage?${parseParams(params)}`)
}

// 送出留言
export const addArticleMessage = (params) =>{
  return http.post(`api/Article/AddMessage?${parseParams(params)}`)
}

// 取得單筆留言回覆的內容
export const getArticleReMessage = (messageId) =>{
  return http.get(`api/Article/GetReMessage?messageId=${messageId}`)
}

// 送出回覆留言
export const addArticleReMessage = (params) =>{
  return http.post(`api/Article/AddReMessage?${parseParams(params)}`)
}


