import axios from 'axios'
// 导出的axios本身就是一个实例，这个实例上有很多的方法get post all等等

// // 最基本的用法
// axios.request({
//   method: 'GET'
// })

// axios.get('')
// // 以上两种写法相同

// get请求
// axios.get()返回一个Promise<AxiosResponse<never>>类型的Promise
// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   // 这里的res的类型为AxiosResponse<never>，它的类型是由axios.get()返回的Promise的泛型所决定的
//   console.log(res.data)
// })

// get请求携带参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'vgri',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // promise本身是可以由类型的
// // 这里的resolve的参数与res的类型，都是有Promise的泛型所决定的
// new Promise<string>((resolve) => {
//   // resolve(123) // 这里要求的是string类型的，number类型不行
//   resolve('123')
// }).then((res) => {
//   console.log(res)
// })

// post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'vae',
//       age: 24
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// -axios的配置选项
// -全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
axios.defaults.headers = {}

// 局部配置
// axios
//   .get('/get', {
//     params: {
//       name: 'vgri',
//       age: 18
//     },
//     // 可在每个请求里面进行局部配置
//     timeout: 5000,
//     headers: {}
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios
//   .post('/post', {
//     data: {
//       name: 'vae',
//       age: 24
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios.all() 多个请求，一起返回
// axios
//   .all([
//     axios.get('/get', { params: { name: 'vgri', age: 18 } }),
//     axios.post('/post', { data: { name: 'vae', age: 24 } })
//   ])
//   .then(([res1, res2]) => {
//     console.log(res1)
//     console.log(res2)
//   })

// axios拦截器
// 应用场景：1. 对于需要携带token的请求，可以对其进行拦截，然后添加token后再返回
// 2. 如果请求时间比较长，可以给页面添加一个lodaing动画，等到请求结束后，再展示数据

// 请求拦截
// fn1：请求发送成功的回调
// fn2：请求发送失败的回调
axios.interceptors.request.use(
  (config) => {
    // 请求添加token
    // isLodaing动画
    console.log('请求成功拦截')
    return config
  },
  (err) => {
    console.log('请求失败')
    return err
  }
)

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    console.log('响应拦截成功')
    return res.data
  },
  (err) => {
    console.log('响应拦截失败')
    return err
  }
)
