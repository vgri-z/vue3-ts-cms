import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { createNamespacedHelpers } from 'vuex'
import { VgriRequestInterceptors, VgriRequestConfig } from './type'

// class的封装性更强，所以使用class对axios进行封装更好
// 在一个项目中，可能有几种不同的网络请求，他们所需要的BaseUrl也是不一样的，例如后台有java，又有c#
// 因此在封装的时候，可以使用不同的axios实例
class VgriRequest {
  // 声明一个instance实例，之后每new一次，创建出来的instance实例都是相互独立的
  // 创建出来的实例就是AxiosInstance类型的
  instance: AxiosInstance
  interceptors?: VgriRequestInterceptors

  constructor(config: VgriRequestConfig) {
    this.instance = axios.create(config)
    // 将interceptors进行保存
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的实例的拦截器
    // 请求拦截hook
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应拦截hook
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    // 各个拦截器的调用顺序可根据项目的具体要求进行调换
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有请求都有：请求拦截成功')
        return config
      },
      (err) => {
        console.log('所有请求都有：请求拦截失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (config) => {
        console.log('所有请求都有：响应拦截成功')
        return config
      },
      (err) => {
        console.log('所有请求都有：响应拦截失败')
        return err
      }
    )
  }

  // 针对某一个请求添加拦截器
  request(config: VgriRequestConfig): void {
    // 本质上requestInterceptor就是一个函数，执行完毕后还会返回config
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res as any)
      }
      console.log(res.data)
    })
  }
}

export default VgriRequest
