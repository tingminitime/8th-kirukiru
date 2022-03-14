import axios from 'axios'
import config from './axios.config'
import { setInterceptors } from './interceptor.config'
console.log(config)

const http = axios.create(config)
setInterceptors(http)

export default http