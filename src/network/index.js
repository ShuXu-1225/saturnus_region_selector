import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://sfe.eyedocloud.net/' // test only
})

// request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // do something before request is sent

    config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODY0MDMwMjA5NSIsImV4cCI6MTYxMzk5NjQ1NywiaWF0IjoxNjEzOTYwNDU3fQ.t2AlFzeq68gt4ZnnptrIJF4t3nw8RZphoEl3JVO4QudgPH57ZlQyI_tWcDpz_QBChR8FmQAdcQVFNIXohP34XA'
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // do something with request error
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
axiosInstance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response.data
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default axiosInstance
