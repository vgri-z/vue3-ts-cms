import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface VgriRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}

export interface VgriRequestConfig extends AxiosRequestConfig {
  interceptors?: VgriRequestInterceptors
}
