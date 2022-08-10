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

// 请求获取商品分页列表
export const reqProductList = (pageNum, pageSize) =>
  myAxios.get("/manage/product/list", { params: { pageNum, pageSize } });

// 根据Desc/Name(描述/名称)搜索产品分页列表
export const reqSearchProduct = (searchType, keyWord, pageNum, pageSize) =>
  myAxios.get("/manage/product/search", {
    params: { [searchType]: keyWord, pageNum, pageSize },
  });

// 更新商品状态
export const reqUpdateProductStatus = (productId, status) =>
  myAxios.post("/manage/product/updateStatus", { productId, status });

// 根据分类ID获取分类信息
export const reqCategoryInfoById = (categoryId) =>
  myAxios.get("/manage/category/info", { params: { categoryId } });

// 根据商品ID获取商品信息
export const reqProductInfoById = (productId) =>
  myAxios.get("/manage/product/info", { params: { productId } });

// 删除图片
export const reqDeletePicture = (name) =>
  myAxios.post("/manage/img/delete", { name });

// 添加商品
export const reqAddProdect = (productObj) =>
  myAxios.post("/manage/product/add", { ...productObj });

// 修改商品
export const reqUpdateProdect = (productObj) =>
  myAxios.post("/manage/product/update", { ...productObj });

// 请求获取角色列表
export const reqRoleList = () => myAxios.get("/manage/role/list");

// 添加商品分类
export const reqAddRole = (roleName) =>
  myAxios.post("/manage/role/add", {
    _id: new Date().getTime() + Math.random().toString(36).substring(2),
    roleName,
  });

// 请求给角色授权
export const reqAuthRole = (roleObject) =>
  myAxios.post("/manage/role/update", { ...roleObject, auth_time: Date.now() });

// 请求获取用户列表
export const reqUserList = () => myAxios.get("/manage/user/list");

// 请求添加用户
export const reqAddUser = (userObject) =>
  myAxios.post("/manage/user/add", { ...userObject, _id: new Date().getTime() + Math.random().toString(36).substring(2), });
