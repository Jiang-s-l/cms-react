import myAxios from "./myAxios";
import { WEATHER_BASE_URL, WEATHER_CITY, WEATHER_KEY } from "../config";
import jsonp from "jsonp";
import { message } from "antd";

// 项目中所有的ajax请求，都在此匹配一个方法
// 登录ajax post请求
// myAxios.post('/login',values)为promise对象
export const reqLogin = (loginObj) => myAxios.post("/login", loginObj); //只有一句话时，省略了return

// 请求天气信息
export const reqWeatherData = () => {
  // 函数中开启异步任务，将异步任务回调的东西作为返回值，使用promise
  return new Promise((resolve, reject) => {
    jsonp(
      `${WEATHER_BASE_URL}?key=${WEATHER_KEY}&city=${WEATHER_CITY}`,
      (err, data) => {
        // console.log(err,data)
        if (!err) {
          resolve(data);
        } else {
          // reject('请求天气数据失败，请联系管理员')
          message.error("请求天气数据失败，请联系管理员");
        }
      }
    );
  });
};

// 请求获取一级或某个二级分类列表
export const reqCategoryList = (parentId) =>
  myAxios.get("/manage/category/list", parentId);

// 添加商品分类
export const reqAddCategory = (parentId, categoryName) =>
  myAxios.post("/manage/category/add", {
    _id: new Date().getTime() + Math.random().toString(36).substring(2),
    parentId,
    categoryName,
  });
// 修改商品分类
export const reqUpdateCategory = (categoryId, categoryName) =>
  myAxios.post("/manage/category/update", { categoryId, categoryName });
