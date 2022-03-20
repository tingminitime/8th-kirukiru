import { createStore } from 'vuex'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      token: '',
      userInfo: null,
      maskBlackState: {
        allowDrop: false,
        isShow: false,
      },
      openEditModal: false,
      requestLoading: false,
      recordPath: 'HomePage',
    }
  },
  getters: {},
  mutations: {
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
    SET_MASK(state, payload) {
      state.maskBlackState.allowDrop = payload.allowDrop
      state.maskBlackState.isShow = payload.isShow
    },
    CLOSE_MASK(state) {
      state.maskBlackState.allowDrop = false
      state.maskBlackState.isShow = false
    },
    OPEN_EDIT_MODAL(state) {
      state.openEditModal = true
    },
    CLOSE_EDIT_MODAL(state) {
      state.openEditModal = false
    },
    SHOW_REQUEST_LOADING(state) {
      state.requestLoading = true
    },
    HIDE_REQUEST_LOADING(state) {
      state.requestLoading = false
    },
    SET_RECORD_PATH(state, payload) {
      state.recordPath = payload
    }
  },
})

export default store