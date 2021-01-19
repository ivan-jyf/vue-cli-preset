import axios from 'axios'
import { get, isEmpty } from 'lodash'
import { clearToken, getToken, setToken } from '../account'
import { VueAxios } from './axios'
import { changeRouteToLoginPage } from '@/utils/router'
import { refreshToken } from '@/api/account'

const NOT_SHOW_ERROR_URL = []

const handleError = message => {
  // TODO: use modal component to handle error
  console.error(message)
}

// create an axios instance
const baseEnvURL = process.env.VUE_APP_BASE_URL
let isRefreshing = false
let requests = []

// set api base_url and time out
const makeRequest = axios.create({
  baseURL: baseEnvURL,
  timeout: 60000
})

const handleRefreshToken = config => {
  if (!isRefreshing) {
    isRefreshing = true
    return refreshToken()
      .then(res => {
        const { token } = res
        setToken(res.token)
        config.headers.Authorization = `Bearer ${token}`
        config.baseURL = baseEnvURL
        requests.forEach(cb => cb(token))
        requests = []
        return makeRequest(config)
      })
      .catch(res => {
        changeRouteToLoginPage()
        clearToken()
      })
      .finally(() => {
        isRefreshing = false
      })
  } else {
    return new Promise(resolve => {
      requests.push(token => {
        config.baseURL = baseEnvURL
        config.headers.Authorization = `Bearer ${token}`
        resolve(makeRequest(config))
      })
    })
  }
}

const error = error => {
  let parsedError = { ...error }
  const response = get(parsedError, 'response')
  const url = get(parsedError, 'response.config.url') || get(parsedError, 'config.url')
  if (isEmpty(response)) {
    parsedError = {
      ...error,
      response: {
        data: { message: 'timeout' },
        status: 500
      }
    }
  }
  const errorCode = get(parsedError, 'response.status')
  const message = get(parsedError, 'response.data.message')
  const config = error.config
  if (errorCode === 401) {
    return handleRefreshToken(config)
  }
  if (!NOT_SHOW_ERROR_URL.some(value => url.includes(value))) {
    switch (errorCode) {
      case 403:
        changeRouteToLoginPage()
        handleError(message)
        break
      case 406:
        handleError(message)
        clearToken()
        break
      default:
        handleError(message)
    }
  }
  return Promise.reject(parsedError)
}

// request interceptor
makeRequest.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = getToken()
    if (token && !config.url.includes('token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    }
    return config
  },
  error =>
    // Do something with request error
    Promise.reject(error)
)

// response interceptor
makeRequest.interceptors.response.use(response => {
  const token = get(response, 'headers.authorization')
  if (token) {
    setToken(token)
  }
  return response.data
}, error)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, makeRequest)
  }
}

export { installer as VueAxios, makeRequest }
