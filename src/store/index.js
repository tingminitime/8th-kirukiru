import { createStore } from 'vuex'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      count: 0,
    }
  }
})

export default store