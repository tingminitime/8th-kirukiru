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
    }
  },
  getters: {},
  mutations: {
    SET_MASK_BLACK(state, payload) {
      state.maskBlackState.allowDrop = payload.allowDrop
      state.maskBlackState.isShow = payload.isShow
    },
    OPEN_LOGIN_MODAL(state, payload) {
      state.maskBlackState.allowDrop = payload
      state.maskBlackState.isShow = true
      state.openLoginModal = true
    },
    CLOSE_LOGIN_MODAL(state) {
      state.maskBlackState.allowDrop = false
      state.maskBlackState.isShow = false
      state.openLoginModal = false
    },
  },
})

export default store