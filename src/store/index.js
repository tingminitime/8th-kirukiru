import { createStore } from 'vuex'
import {
  getUserSubscribeList,
  addKiruLove,
  addKiruCollection,
  getKiruCollections,
  removeKiruCollection,
  addCommonLove,
  addCommonCollection,
  getCommonCollections,
  removeCommonCollection,
} from '@api'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      // --- 儲存資訊 ---
      token: '',
      userInfo: {},
      recordPath: 'HomePage',
      recordParams: '',
      userSubscribeList: [],
      checkUserSubscribeStatus: false,
      userAddLoveList: [],
      userKiruCollections: [],
      userCommonCollections: [],

      // --- Loading類 ---
      overlayLoading: false,
      allowRequestLoading: true,
      requestLoading: false,

      // --- 彈出視窗類 ---
      showAlert: false,
      showSearch: false,
      maskBlackState: {
        allowDrop: false,
        isShow: false,
      },
      openEditModal: false,
    }
  },
  getters: {
    userSignInStatus(state) {
      return Object.keys(state.userInfo).length !== 0 && state.token !== ''
    },
  },
  mutations: {
    // 使用者登入 / 註冊管理
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
    SIGN_OUT(state) {
      state.userInfo = {}
      state.token = ''
      state.userSubscribeList.length = 0
    },

    // 使用者前台管理
    UPDATE_SUBSCRIBE_LIST(state, payload) {
      state.userSubscribeList = payload
    },
    CHECK_SUBSCRIBE_LIST(state, status) {
      state.checkUserSubscribeStatus = status
    },

    // Mask 狀態管理
    SET_MASK(state, payload) {
      state.maskBlackState.allowDrop = payload.allowDrop
      state.maskBlackState.isShow = payload.isShow
    },
    CLOSE_MASK(state) {
      state.maskBlackState.allowDrop = false
      state.maskBlackState.isShow = false
    },

    // Alert 狀態管理
    SHOW_ALERT(state) {
      state.showAlert = true
    },
    CLOSE_ALERT(state) {
      state.showAlert = false
    },

    // Search 狀態管理
    SHOW_SEARCH(state) {
      state.showSearch = true
    },
    CLOSE_SEARCH(state) {
      state.showSearch = false
    },
    TOGGLE_SEARCH(state) {
      state.showSearch = !state.showSearch
    },

    // 撰寫文章彈出 Modal 狀態管理
    OPEN_EDIT_MODAL(state) {
      state.openEditModal = true
    },
    CLOSE_EDIT_MODAL(state) {
      state.openEditModal = false
    },

    // Overlay Loading 狀態管理
    SHOW_OVERLAY_LOADING(state) {
      state.overlayLoading = true
    },
    HIDE_OVERLAY_LOADING(state) {
      state.overlayLoading = false
    },

    // 右下 Loading 狀態管理
    ALLOW_REQUEST_LOADING(state) {
      state.allowRequestLoading = true
    },
    BAN_REQUEST_LOADING(state) {
      state.allowRequestLoading = false
    },
    SHOW_REQUEST_LOADING(state) {
      state.requestLoading = true
    },
    HIDE_REQUEST_LOADING(state) {
      state.requestLoading = false
    },

    // 記錄前頁 router path
    SET_RECORD_PATH(state, payload) {
      state.recordPath = payload
    },

    // 使用者按文章愛心
    LOAD_ARTICLE_LOVE(state) {
      const addLoveList = JSON.parse(localStorage.getItem('userAddLoveList'))
      if (addLoveList) {
        state.userAddLoveList = addLoveList
      }
    },
    // 更新按愛心文章清單
    UPDATE_ARTICLE_LOVE(state, payload) {
      state.userAddLoveList.push(payload)
      localStorage.setItem('userAddLoveList', JSON.stringify(state.userAddLoveList))
    },
    // 更新收藏切切文章清單
    UPDATE_KIRU_COLLECTIONS(state, payload) {
      state.userKiruCollections = payload
    },
    // 更新收藏一般文章清單
    UPDATE_COMMON_COLLECTIONS(state, payload) {
      state.userCommonCollections = payload
    },
  },
  actions: {
    // 取得使用者訂閱清單
    GET_SUBSCRIBE_LIST({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getUserSubscribeList(payload).then(res => {
          console.log('取得使用者訂閱清單: ', res)
          if (res.data.success) {
            commit('UPDATE_SUBSCRIBE_LIST', res.data.data)
            commit('CHECK_SUBSCRIBE_LIST', true)
            resolve({ success: true, data: res.data })
          } else {
            console.log(res)
            resolve({ success: false, errors: res })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 增加切切文章愛心
    ADD_KIRU_LOVE({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        addKiruLove(payload).then(res => {
          console.log('按愛心: ', res)
          if (res.data.success) {
            const checkRepeat = state.userAddLoveList.findIndex(item => {
              return item.articleId === payload.artId
            })
            if (checkRepeat === -1) {
              commit('UPDATE_ARTICLE_LOVE', {
                articleId: payload.artId,
                type: 'kiru',
              })
            }
            resolve({ success: true })
          } else {
            resolve({ success: false })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 取得使用者收藏切切文章
    GET_KIRU_COLLECTIONS({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getKiruCollections(payload).then(res => {
          console.log('取得使用者收藏切切文章: ', res)
          if (res.data.success) {
            commit('UPDATE_KIRU_COLLECTIONS', res.data.data)
            resolve({ success: true, total: res.data.total })
          } else {
            resolve({ success: false, errors: res })
          }
        }).catch(error => reject(error))
      })
    },
    // 收藏切切文章
    ADD_KIRU_COLLECTION({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        addKiruCollection(payload.artId).then(res => {
          console.log('按收藏: ', res)
          if (res.data.success) {
            // 成功收藏後調用
            dispatch('GET_KIRU_COLLECTIONS', {
              nowpage: 1,
              showcount: 9999,
            })
            resolve({ success: true })
          } else {
            resolve({ success: false, errors: res })
          }
        }).catch(error => reject(error))
      })
    },
    // 取消收藏切切文章
    REMOVE_KIRU_COLLECTIONS({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        removeKiruCollection(payload.artId).then(res => {
          console.log('取消收藏: ', res)
          if (res.data.success) {
            // 成功收藏後調用
            dispatch('GET_KIRU_COLLECTIONS', {
              nowpage: 1,
              showcount: 9999,
            })
            resolve(res.data)
          } else {
            resolve(res.data)
          }
        }).catch(error => reject(error))
      })
    },

    // 增加一般文章愛心
    ADD_COMMON_LOVE({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        addCommonLove(payload).then(res => {
          if (res.data.success) {
            const checkRepeat = state.userAddLoveList.findIndex(item => {
              return item.articleId === payload.artId
            })
            if (checkRepeat === -1) {
              commit('UPDATE_ARTICLE_LOVE', {
                articleId: payload.artId,
                type: 'common',
              })
            }
            resolve({ success: true })
          } else {
            reject(error)
            this.$router.push({ name: 'SignIn' })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 取得使用者收藏一般文章
    GET_COMMON_COLLECTIONS({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getCommonCollections(payload).then(res => {
          console.log('取得使用者收藏一般文章: ', res)
          if (res.data.success) {
            commit('UPDATE_COMMON_COLLECTIONS', res.data.data)
            resolve({ success: true, total: res.data.total })
          } else {
            resolve({ success: false, errors: res })
          }
        }).catch(error => reject(error))
      })
    },
    // 收藏一般文章
    ADD_COMMON_COLLECTION({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        addCommonCollection(payload.artId).then(res => {
          console.log('按收藏: ', res)
          if (res.data.success) {
            // 成功收藏後調用
            dispatch('GET_COMMON_COLLECTIONS', {
              nowpage: 1,
              showcount: 9999,
            })
            resolve({ success: true })
          } else {
            resolve({ success: false, errors: res })
          }
        }).catch(error => reject(error))
      })
    },
    // 取消收藏一般文章
    REMOVE_COMMON_COLLECTIONS({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        removeCommonCollection(payload.artId).then(res => {
          console.log('取消收藏: ', res)
          if (res.data.success) {
            // 成功收藏後調用
            dispatch('GET_COMMON_COLLECTIONS', {
              nowpage: 1,
              showcount: 9999,
            })
            resolve(res.data)
          } else {
            resolve(res.data)
          }
        }).catch(error => reject(error))
      })
    },
  },
})

export default store