import {SAVE_MENU_TITLE, DELETE_MENU_TITLE} from '../action_types'

// 保存菜单标题
export const saveMenuTitle = (value)=> {
    return {type:SAVE_MENU_TITLE,data:value}
}

// 删除菜单标题
export const deleteMenuTitle = (value)=> {
    return {type:DELETE_MENU_TITLE,data:value}
}

