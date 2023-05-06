import axios, { AxiosResponse } from 'axios'


let CANCEL_TOKEN_SOURCE = axios.CancelToken.source()

type TokenType = 'accessToken' | 'refreshToken'
export const getToken = (token: TokenType) => {
  return localStorage.getItem(token)
}
export const setToken = (tokenType: TokenType, tokenValue: string) => {
    localStorage.setItem(tokenType, tokenValue)
}
export interface Body {
    API_KEY?: string
    [key: string]: any
  }
  
  export type MethodType = 'post' | 'delete' | 'put' | 'get'
  
  export interface headers {
    'Content-Type': string
    [key: string]: string
  }
  
  export interface APIParams {
    body: Body
    path: string
    method?: MethodType
    headers?: headers
    responseType?: string | null
  }

// * Request Interceptor
axios.interceptors.request.use(
  async config => {
    // * Get corresponding token according to URL
    const tokenName = config.url?.includes('token_refresh')
      ? 'refreshToken'
      : 'accessToken'
    const token = await getToken(tokenName)
    if (typeof config?.headers === 'object') {
      // * Add Authorization Token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // * Add API Key
      config.headers['x-api-key'] = process.env
        .REACT_APP_BACKEND_API_KEY as string
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// * Response Interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error?.config
    const originalUrl = originalRequest?.url

    const getAccessToken = async () => {
      const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/token_refresh/`
      try {
        // * Send Access Token request using Refresh token
        // eslint-disable-next-line camelcase
        const response: AxiosResponse<{ access_token: string }> =
          await axios.post(url, {})
        const newAccessToken = response.data?.access_token
        // * Store Access Token in Web Storage
        setToken('accessToken', newAccessToken)
        // * Send original Request
        return axios(originalRequest)
      } catch (err) {
        Promise.reject(err)
      }
    }
    if (error?.response?.status === 401 || error?.response?.status === 422) {
      if (originalUrl.includes('token_refresh') || originalRequest?._retry) {
        // * Redirect if error happens during retry and token refresh
        // logout()
        error.redirect = '/logout'
        throw error
      } else if (!originalUrl?.includes('login') && !originalRequest?._retry) {
        // * Retry again with new access token
        originalRequest._retry = true
        return getAccessToken()
      } else throw error
    } else {
      throw error
    }
  }
)

// * Default headers
const defaultHeaders = {
  'Content-Type': 'multipart/form-data;'
}

// * Requests to default Backend Server
export const fetchData = ({
  path,
  body,
  method = 'post',
  headers = defaultHeaders,
  responseType = null
}: APIParams) => {
  const url = `${process.env.REACT_APP_BACKEND_BASE_URL}${path}`
  const cancelToken = CANCEL_TOKEN_SOURCE.token
  const config: any = { method, url, data:body, headers, cancelToken }
  if (responseType) {
    config.responseType = responseType
  }
  return axios(config)
}

// * Generate token to cancel requets
const generateNewCancelTokenSource = () => {
  CANCEL_TOKEN_SOURCE = axios.CancelToken.source()
}

// * Function to cancel ongoing API calls
export const finishPendingRequests = (cancellationReason?: string) => {
  CANCEL_TOKEN_SOURCE.cancel(cancellationReason)
  generateNewCancelTokenSource()
}