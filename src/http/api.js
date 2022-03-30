import http from './index'
import httpForm from './index-form'

// 物件轉 params
const parseParams = (params) => {
  if (typeof params !== 'object') return false
  let urlEncode = ''
  for (const [key, value] of Object.entries(params)) {
    if (
      typeof value === 'string'
      || typeof value === 'number'
      || typeof value === 'boolean'
    ) {
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

// 取得會員訂閱清單
export const getUserSubscribeList = (params) => {
  return http.get(`api/Member/GetMyOrder?${parseParams(params)}`)
}

// 取得特定文章類別
export const getCategoryName = (categoryId) => {
  return http.get(`api/Test/GetArtlog?Artid=${categoryId}`)
}

// 圖片上傳
export const uploadImage = (data) => {
  return httpForm.post(`upload`, data)
}

// 取得作者資訊
export const getAuthorInfo = (username) => {
  return http.get(`api/Member/GetName?author=${username}`)
}

// -------- 切切文章 --------
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

// 取得切切文章所有留言
export const getKiruMessage = (params) =>{
  return http.get(`api/Article/GetAllMessage?${parseParams(params)}`)
}

// 送出留言
export const addKiruMessage = (params) =>{
  return http.post(`api/Article/AddMessage?${parseParams(params)}`)
}

// 取得單筆留言回覆的內容
export const getKiruReMessage = (messageId) =>{
  return http.get(`api/Article/GetReMessage?messageId=${messageId}`)
}

// 送出回覆留言
export const addKiruReMessage = (params) =>{
  return http.post(`api/Article/AddReMessage?${parseParams(params)}`)
}

// 關鍵字搜尋切切
export const searchKiru = (params) =>{
  return http.get(`api/Homepage/Seekstringarticle?${parseParams(params)}`)
}

// 取得相關切切文章
export const getKiruContentRelated = (params) =>{
  return http.get(`api/Article/GetArtlogArticle?${parseParams(params)}`)
}

// 取得相關切切文章
export const getRelatedKiru = (params) =>{
  return http.get(`api/Homepage/SeekArticle?${parseParams(params)}`)
}

// 切切文章按愛心
export const addKiruLove = (params) =>{
  return http.put(`api/Article/AddLoveArticle?${parseParams(params)}`)
}

// 切切文章收藏
export const addKiruCollection = (articleId) =>{
  return http.post(`api/Article/Collectarticle?artId=${articleId}`)
}

// 切切文章取消收藏
export const removeKiruCollection = (articleId) =>{
  return http.delete(`api/Article/Deletecollect?artId=${articleId}`)
}

// 取得收藏的切切文章
export const getKiruCollections = (params) =>{
  return http.get(`api/Article/GetAllcollectart?${parseParams(params)}`)
}

// -------- 一般文章 --------
// 添加一般文章
export const addNormalArticle = (data) => {
  return http.post(`api/ArticleNormal/CreatArticleNormal`, data)
}

// 取得編輯一般文章資料
export const getEditNormalArticle = (id) => {
  return http.get(`api/ArticleNormal/GetNormalArticle?artId=${id}`)
}

// 編輯一般文章
export const editNormalArticle = (articleId, data) => {
  return http.put(`EditArticleNormal?artId=${articleId}`, data)
}

// 取得一般文章資料
export const getCommonArticle = (articleId) =>{
  return http.get(`api/ArticleNormal/GetArticleNormal?artId=${articleId}`)
}

// 取得一般文章所有留言
export const getCommonMessage = (params) =>{
  return http.get(`api/Article/GetAllMessage?${parseParams(params)}`)
}

// 送出一般文章留言
export const addCommonMessage = (params) =>{
  return http.post(`api/Article/AddMessage?${parseParams(params)}`)
}

// 取得一般文章單筆留言回覆的內容
export const getCommonReMessage = (messageId) =>{
  return http.get(`api/Article/GetReMessage?messageId=${messageId}`)
}

// 送出一般文章回覆留言
export const addCommonReMessage = (params) =>{
  return http.post(`api/Article/AddReMessage?${parseParams(params)}`)
}

// 關鍵字搜尋一般文章
export const searchNormal = (params) =>{
  return http.get(`api/Homepagenormal/Seekstringarticle?${parseParams(params)}`)
}

// 取得相關一般文章
export const getRelatedCommon = (params) =>{
  return http.get(`api/Homepagenormal/SeekArticle?${parseParams(params)}`)
}

// 一般文章按愛心
export const addCommonLove = (params) =>{
  return http.put(`api/ArticleNormal/AddLoveArticleNormal?${parseParams(params)}`)
}

// 一般文章收藏
export const addCommonCollection = (articleId) =>{
  return http.post(`api/ArticleNormal/Collectarticle?artId=${articleId}`)
}

// 一般文章取消收藏
export const removeCommonCollection = (articleId) =>{
  return http.delete(`api/ArticleNormal/Deletecollect?artId=${articleId}`)
}

// 取得收藏的一般文章
export const getCommonCollections = (params) =>{
  return http.get(`api/ArticleNormal/GetAllcollectart?${parseParams(params)}`)
}
