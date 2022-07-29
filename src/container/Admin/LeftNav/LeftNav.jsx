import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {connect} from 'react-redux'
import {saveMenuTitle} from '../../../redux/actions/menu_action'
import "./left_nav.less";
import logo from "../../../assets/images/logo.png";
import items from '../../../config/congif-menu'



function LeftNav(props) {
  const navigate = useNavigate();
  let selectKey = ''; //初始选中的菜单项 key 数组
  let openKey = []; //初始展开的 SubMenu 菜单项 key 数组
  const { pathname } = useLocation();
  selectKey = pathname.split("/").reverse()[0];
  openKey = (pathname.split("/").splice(2));

  const menuCLick = ({ key, keyPath }) => {
    let menutitle = ''
    if (keyPath.length !== 2) {
      navigate(key);
      items.forEach((menuObj)=>{
        if(menuObj.key === key){
          menutitle =  menuObj.label
        }
      })
    } else {
      navigate(`${keyPath[1]}/${keyPath[0]}`);
      items.forEach((menuObj)=>{
        if (menuObj.children instanceof Array) {
          let result = menuObj.children.find((menuChildObj) => {
            return menuChildObj.key === key;
          });
          if(result) menutitle =  result.label
        }
      })
    }
    props.saveMenuTitle(menutitle)
  };


  return (
    <div className="left-nav">
      <div className="nav-top">
        <img src={logo} alt="Logo" />
        <h1>商品管理系统</h1>
      </div>
      <Menu
        selectedKeys={[selectKey]} //初始选中的菜单项 key 数组
        defaultOpenKeys={openKey} //初始展开的 SubMenu 菜单项 key 数组
        mode="inline" //菜单类型，现在支持垂直、水平、和内嵌模式三种
        theme="dark"
        items={items}
        onClick={menuCLick}
      />
    </div>
  );
}

export default connect(
  state =>({}),
  {saveMenuTitle}
)(LeftNav)
