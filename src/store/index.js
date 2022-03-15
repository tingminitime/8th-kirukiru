import { createStore } from 'vuex'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      loginInfo: {},
      maskBlackState: {
        allowDrop: false,
        isShow: false,
      },
      maskWhiteState: false,
      openLoginModal: false,
      openRegisterModal: false,
    }
  },
  getters: {},
  mutations: {
    SET_MASK(state, payload) {
      state.maskBlackState.allowDrop = payload.allowDrop
      state.maskBlackState.isShow = payload.isShow
    },
    CLOSE_MASK(state) {
      state.maskBlackState.allowDrop = false
      state.maskBlackState.isShow = false
    },
    OPEN_LOGIN_MODAL(state) {
      state.openLoginModal = true
    },
    CLOSE_LOGIN_MODAL(state) {
      state.openLoginModal = false
    },
    OPEN_REGISTER_MODAL(state) {
      state.openRegisterModal = true
    },
    CLOSE_REGISTER_MODAL(state) {
      state.openRegisterModal = false
    },
  },
})

export default store