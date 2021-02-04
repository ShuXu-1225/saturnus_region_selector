import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://sfe.eyedocloud.net/'
})

// request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // do something before request is sent

    config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODY0MDMwMjA5NSIsImV4cCI6MTYxMjQ0NDIyMiwiaWF0IjoxNjEyNDA4MjIyfQ.yATrXAE0s6k59gE5EHlGhULgEcukPsyK1wAyvaOPjumTkGq32tkEy6oDrQKcjcHF5txC7OJ6z8LhTHz-5rpkMQ'
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
