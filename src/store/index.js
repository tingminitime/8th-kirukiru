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
      openEditModal: false,
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
    OPEN_EDIT_MODAL(state) {
      state.openEditModal = true
    },
    CLOSE_EDIT_MODAL(state) {
      state.openEditModal = false
    },
  },
})

export default store