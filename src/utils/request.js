import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3030'

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 登录成功后配置全局请求头
    let token = sessionStorage.getItem('authorization-token')
    if (token !== null) {
      config.headers['authorization-token'] = token
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 判断后台数据响应是否为 401
    if (
      response.data.status === 401 ||
      response.data.msg == '登录已过期,请重新登录'
    ) {
      return router.push('/login')
    }
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default axios
