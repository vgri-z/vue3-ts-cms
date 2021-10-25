import { createApp } from 'vue'
// import { globalRegister } from './global'

// import './service/axios.demo'
// import './service/request/config'
import vgriRequest from './service'

// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'

import rootApp from './App.vue'

import router from './router'
import store from './store'

const app = createApp(rootApp)

// 注册element-plus/或其他
// globalRegister(app)
// app.use(globalRegister) // 也可以通过，app.use()注册，use接受一个函数或者对象，vue内部也会默认执行这个函数，并且将app作为参数传递给这个函数
app.use(router)
app.use(store)
// app.use(ElementPlus)

// app的挂在需放在最后面
app.mount('#app')

// 获取环境变量
// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// 网络请求
// vgriRequest.get()
// vgriRequest.request()
vgriRequest.request({
  url: '/home/multidata',
  method: 'GET',
  interceptors: {
    requestInterceptor(config) {
      console.log('某个请求独有的请求拦截')
      return config
    },
    responseInterceptor(res) {
      console.log('某个请求独有的响应拦截')
      return res
    }
  }
})

// vgriRequest.request({
//   url: '/home/multidata',
//   method: 'GET'
// })
