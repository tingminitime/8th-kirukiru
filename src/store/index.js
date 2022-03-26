import { createStore } from 'vuex'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      // --- 儲存資訊 ---
      token: '',
      userInfo: {},
      userSignIn: false,
      recordPath: 'HomePage',
      recordParams: '',

      // --- Loading類 ---
      overlayLoading: false,
      allowRequestLoading: true,
      requestLoading: false,

      // --- 彈出視窗類 ---
      showAlert: false,
      maskBlackState: {
        allowDrop: false,
        isShow: false,
      },
      openEditModal: false,
    }
  },
  getters: {
    userSignInStatus(state) {
      return Object.keys(state.userInfo).length !== 0
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
      state.userInfo = null
      state.token = ''
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

    // 撰寫文章談出 Modal 狀態管理
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
  },
})

export default store