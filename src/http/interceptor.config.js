import store from '@/store/index.js'
import { errorMessage } from './status'
import { notify } from 'notiwind'

export const setInterceptors = (axiosInstance) => {
  // request intercept
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('kirukiruToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      if (!store.state.overlayLoading) {
        store.commit('SHOW_REQUEST_LOADING')
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // response intercept
  axiosInstance.interceptors.response.use(
    (config) => {
      store.commit('HIDE_REQUEST_LOADING')
      return config
    },
    (error) => {
      const { response } = error
      console.log(response)
      store.commit('HIDE_REQUEST_LOADING')
      if (response) {
        notify({
          group: 'error',
          title: `伺服器回應錯誤 (${response.status})`,
          text: errorMessage(response.status),
        })
      }
      return Promise.reject(error)
    }
  )
}