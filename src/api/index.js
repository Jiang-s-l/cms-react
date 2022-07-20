import myAxios from './myAxios'

// 项目中所有的ajax请求，都在此匹配一个方法
// 登录ajax post请求
// myAxios.post('/login',values)为promise对象
export const reqLogin = (loginObj)=> myAxios.post('/login',loginObj)//只有一句话时，省略了return