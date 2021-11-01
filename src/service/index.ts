// 新建一个index.ts，作为service的统一出口
// 为导出的对象名称添加一个前缀，避免与其他的名称发生冲突
import VgriRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'

const vgriRequest = new VgriRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = ''
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // console.log('请求拦截成功')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求拦截失败')
      console.log(err)
    },
    responseInterceptor: (config) => {
      // console.log('响应拦截成功')
      return config
    }
    // responseInterceptorCatch: (err) => {
    //   console.log('响应拦截成功')
    //   console.log(err)
    // }
  }
})

export default vgriRequest
