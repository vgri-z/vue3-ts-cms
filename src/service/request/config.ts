// 方法一：手动修改
// 开发环境
// const BASE_URL = 'http://vgri.org/dev'
// const BASE_NAME = 'vgri'

// 生产环境
// const BASE_URL = 'http://vgri.org/prod'
// const BASE_NAME = 'vae'

// 测试环境
// const BASE_URL = 'http://vgri.org/test'
// const BASE_NAME = 'silence'

// export { BASE_URL, BASE_NAME }

// 方法二：process.env.NODE_ENV，这个变量会根据环境的不同而具有不同的值
// 开发环境：development
// 生产环境：production
// 测试环境：test

let BASE_URL = 'http://123.207.32.32:8000'
const TIME_OUT = 10000
// console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:8000'
} else {
  BASE_URL = 'http://123.207.32.32:8000'
}

export { TIME_OUT, BASE_URL }
