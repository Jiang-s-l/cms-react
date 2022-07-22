import { SAVE_USERINFO, DELETE_USERINFO } from "../action_types";

// 从localStorage中读取之前保存的用户信息（可能读取不到，如读到了，就给redux初始化）
let _userInfo = JSON.parse(localStorage.getItem("userInfo"));
// console.log("_userInfo", _userInfo);

let initState = {
  user: _userInfo || {},
  isLogin: _userInfo ? true : false,
};
export default function Login(preState = initState, action) {
  const { type, data } = action;
  let newState;
  switch (type) {
    case SAVE_USERINFO:
      newState = { user: data, isLogin: true };
      return newState;
    case DELETE_USERINFO:
      newState = { user: [], isLogin: false };
      return newState;
    default:
      return preState;
  }
}
