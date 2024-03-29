import axios from "axios";
import { message } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import qs from 'querystring'//qs.stringify()将对象 序列化成URL的形式，以&进行拼接
import { BASE_URL } from "../config";
// import store from '../redux/store'
import {deleteUserInfo} from '../redux/actions/login_action'

// axios请求的基本路径
axios.defaults.baseURL = BASE_URL;

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 进度条开始
  NProgress.start();

  /* 如果有token */
  // 1. 获取已保存的token
  // let {token} = store.getState.userInfo
  // 携带token
  // if(token) config.headers.Authorization = 'atguigu_' + token

  /* let {data,method} = config

  // 统一处理所有post请求携带参数问题
  // 以下代码是因为后端只能接收urlencoded格式，不能接收JSON数据格式
  //  当前可以传递JSON数据
    if(method.toUpperCase === 'POST' && data instanceof Object){
        config.data = qs.stringify(data)
    } */
  return config;
});

// 响应拦截器
axios.interceptors.response.use(
  // 请求成功直接返回data数据
  (response) => {
    // 进度条结束
    NProgress.done();
    return response.data;
  },

  /* 只要请求出错，就不再向下走了，统一提示页面显示一个请求失败的信息
    请求出错，返回初始化Promise对象，
    只要返回初始化promise对象，使用时既不走失败回调，也不走成功回调 */
  (error) => {
    NProgress.done();
    // 判断返回状态码是否为401,401为未授权
    if(error.response.status === 401){
      message.error('身份验证失败，请重新登录')
      // 重新跳转到登录页面进行登录
      StorageEvent.dispatch(deleteUserInfo())
    }else{
      message.error(`请求出错，请联系管理员(${error.message})`);
    }
    return new Promise(() => {});
  }
);

export default axios;
