import axios from 'axios'
import config from './axios-form.config'
import { setInterceptors } from './interceptor.config'

const httpForm = axios.create(config)
setInterceptors(httpForm)

export default httpForm