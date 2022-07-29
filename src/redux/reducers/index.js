import { combineReducers } from 'redux'
import LoginReducer from './login_reducer'
import MenuReducer from './menu_reducer'
import CategoryReducer from './category_reducer'

// 整合所有reducer汇总所有状态
export default combineReducers({
    // 该对象里的key和value决定着store里保存该状态的key和value
    userInfo:LoginReducer,
    menuTitle:MenuReducer,
    categoryList:CategoryReducer
})