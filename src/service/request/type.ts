import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface VgriRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: any) => any
  responseInterceptorCatch?: (err: any) => any
}

export interface VgriRequestConfig extends AxiosRequestConfig {
  interceptors?: VgriRequestInterceptors
  showLoading?: boolean // 是否添加loading效果
}
