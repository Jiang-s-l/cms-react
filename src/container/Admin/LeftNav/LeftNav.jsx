import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, message } from "antd";
import { connect } from "react-redux";
import { saveMenuTitle } from "../../../redux/actions/menu_action";
import "./left_nav.less";
import logo from "../../../assets/images/logo.png";
import menuAllList from "../../../config/congif-menu";
import lodash from 'lodash'

function LeftNav(props) {
  const navigate = useNavigate();
  let selectKey = ""; //初始选中的菜单项 key 数组
  let openKey = []; //初始展开的 SubMenu 菜单项 key 数组
  const { pathname } = useLocation();
  if (pathname.indexOf("/product") !== -1) {
    selectKey = "product";
  } else {
    selectKey = pathname.split("/").reverse()[0];
  }

  openKey = pathname.split("/").splice(2);

  const [menuAuthList, setMenuAuthList] = useState([]);

  // let arr = [...menuAllList]
  // let arr = JSON.parse(JSON.stringify(menuAllList))
  let arr = lodash.cloneDeep(menuAllList)
  console.log(arr instanceof Array)

  // 最后确定展示的菜单
  let finalMenuList = '';


  useEffect(() => {

    // 获取授权的菜单，在此方法里将最后的值赋给finalMenuList
    getAuthMenu(arr);
    setMenuAuthList(finalMenuList)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 获取授权的菜单(有问题,因为数组深拷贝后，不支持有循环引用的对象，若从后台获取数据应该没有问题)
  const getAuthMenu = (menuList) => {
    // 如果为admin用户有所有权限,当前这里有问题，菜单不全，刷新后才全
    if (props.username === "admin") {
      finalMenuList = menuList;
      if (
        finalMenuList[1].children.length !== 2 ||
        finalMenuList[4].children.length !== 3
      ) {
        message.warning("需刷新页面才能显示正常", 1);
      }
    } 
    else {
      // 不为admin用户，对所有菜单进行过滤，获取已授权菜单
      finalMenuList = menuList.filter((menu) => {
        // 当前值没有children
        if (!menu.children) {
          // 当前值的key不存在授权菜单的数组中，返回false，将此值去掉
          if (props.menus.indexOf(menu.key) === -1) {
            return false;
          }
        }
        // 当前值有children
        if (menu.children) {
          // 判断它的子节点是否在授权菜单中
          let menu_children = [...menu.children];
          menu_children = menu_children.filter((item) => {
            if (props.menus.indexOf(item.key) === -1) {
              return false;
            }
            return true;
          });
          menu.children = menu_children
          // 子菜单都不展示，父菜单也不展示，只要有一个子菜单展示，父菜单要展示
          if (menu_children.length === 0) return false;
          else return true;
        }
        return true;
      });
      /* finalMenuList.forEach((item2)=>{
        if(item2.children){
          let result = item2.children.filter((item3)=>{
            if (props.menus.indexOf(item3.key) === -1) {
              return false;
            }
            return true
          })
          console.log(result)
          item2 = result
        }
      }) */
    }
    console.log("finalMenuList",finalMenuList)
    console.log("输出最后的值",menuAllList);
  };

  const menuCLick = ({ key, keyPath }) => {
    let menutitle = "";
    if (keyPath.length !== 2) {
      navigate(key);
      menuAuthList.forEach((menuObj) => {
        if (menuObj.key === key) {
          menutitle = menuObj.label;
        }
      });
    } else {
      navigate(`${keyPath[1]}/${keyPath[0]}`);
      menuAuthList.forEach((menuObj) => {
        if (menuObj.children instanceof Array) {
          let result = menuObj.children.find((menuChildObj) => {
            return menuChildObj.key === key;
          });
          if (result) menutitle = result.label;
        }
      });
    }
    props.saveMenuTitle(menutitle);
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
        items={menuAuthList}
        onClick={menuCLick}
      />
    </div>
  );
}

export default connect(
  (state) => ({
    username: state.userInfo.user.username,
    menus: state.userInfo.user.role.menus,
  }),
  { saveMenuTitle }
)(LeftNav);
