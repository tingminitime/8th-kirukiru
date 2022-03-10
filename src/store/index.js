import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 0,
    }
  }
})

export default store