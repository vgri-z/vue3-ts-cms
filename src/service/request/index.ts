import axios from 'axios'
import { AxiosInstance } from 'axios'
import { VgriRequestInterceptors, VgriRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'
// 需单独引入loading的样式，也可以在main.ts里面直接引入全局样式文件index.css
import 'element-plus/theme-chalk/el-loading.css'

const DEFAULT_LOADING = true

// class的封装性更强，所以使用class对axios进行封装更好
// 在一个项目中，可能有几种不同的网络请求，他们所需要的BaseUrl也是不一样的，例如后台有java，又有c#
// 因此在封装的时候，可以使用不同的axios实例
class VgriRequest {
  // 声明一个instance实例，之后每new一次，创建出来的instance实例都是相互独立的
  // 创建出来的实例就是AxiosInstance类型的
  instance: AxiosInstance
  interceptors?: VgriRequestInterceptors
  showLoading: boolean // 是否展示loading效果
  loading?: ILoadingInstance

  constructor(config: VgriRequestConfig) {
    this.instance = axios.create(config)
    // 将interceptors进行保存
    this.interceptors = config.interceptors
    // 保存showLoading的值
    this.showLoading = config.showLoading ?? DEFAULT_LOADING // 默认显示loading效果
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
        // 是否显示loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有请求都有：请求拦截失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有请求都有：响应拦截成功')

        // 请求成功将loading移除
        setTimeout(() => {
          this.loading?.close()
        }, 1000)

        const data = res.data
        // 第二种请求失败判断：根据服务器返回的code进行判断
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有请求都有：响应拦截失败')

        // 请求失败将loading移除
        this.loading?.close()

        // 第一种请求失败判断：判断不同的HttpErrorCode显示不同的错误信息
        switch (err.response.status) {
          case 404:
            console.log('404 not found')
            break
          case 415:
            console.log('415 格式不对')
            break
          default:
            break
        }
        return err
      }
    )
  }

  // 针对某一个请求添加拦截器
  request<T>(config: VgriRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 本质上requestInterceptor就是一个函数，执行完毕后还会返回config
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res as any)
          }

          // 将showLoading设置为true，避免影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 将结果返回出去
          resolve(res)
          console.log(res)
        })
        .catch((err) => {
          // 将showLoading设置为true，避免影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          console.log(err)
        })
    })
  }

  get<T>(config: VgriRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: VgriRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: VgriRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: VgriRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default VgriRequest
