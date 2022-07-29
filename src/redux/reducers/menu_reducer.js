import { SAVE_MENU_TITLE } from "../action_types";

// 初始状态
let initState = '';
export default function MenuTitle(preState = initState, action) {
  const { type, data } = action;
  let newState;
  switch (type) {
    case SAVE_MENU_TITLE:
      newState = data;
      return newState;
    default:
      return preState;
  }
}
