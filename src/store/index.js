import { createStore } from 'vuex'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      count: 0,
      numbers: [0, 1, 2, 3, 4, 5, 6],
      todos: [
        {
          uid: 1,
          content: '我是1啦',
        },
        {
          uid: 2,
          content: '我是2啦',
        },
      ]
    }
  },
  getters: {
    oddNumbers(state) {
      return state.numbers.filter(num => num % 2 === 1)
    },
    evenNumbers(state) {
      return state.numbers.filter(num => num % 2 === 0)
    },
    filterTodos(state) {
      return (uid) => {
        return state.todos.find(todo => todo.uid === uid)
      }
    }
  },
})

export default store