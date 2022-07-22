import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'

// 保存用户数据
export const saveUserInfo = (value)=> {
    // 存储到本地
    localStorage.setItem('userInfo',JSON.stringify(value))

    return {type:SAVE_USERINFO,data:value}
}
// 删除用户数据
export const deleteUserInfo = (value)=> {
    // 将存储存储到本地的用户数据删除
    localStorage.removeItem('userInfo')

    return {type:DELETE_USERINFO,data:''}
}