// 自定义的高阶组件（函数接收一个组件，并返回一个组件）
/* 此组件是用来判断当前路径在登录后和未登录后页面的跳转或传值 */

import React from "react";
import { connect } from "react-redux";
import {Navigate, useLocation} from 'react-router-dom'

export default function check_login(CurrentComponent) {
  let NewComponent = (props)=> {
    // console.log("NewComponent",props);
    // 将props中的属性解构出来（从使用check_login(XXX)的connect连接中接收到的）
    const {...params} = props
    // console.log({...params});
    // 获取redux中是否已登录的值
    const {isLogin} = props
    // 获取当前路径
    const {pathname} = useLocation()

    //想去login，但已登录，不允许，跳转到admin
    // 想去admin，但未登录，不允许，跳转到login
    if(pathname === '/login' && isLogin) return <Navigate to='/admin' />
    if(pathname !== '/login' && !isLogin) return <Navigate to='/login' />

    // 不走以上判断，返回当前页面，并将props中的值传递到当前页面的组建中
    return <CurrentComponent {...params}/>;
  }
  //NewComponent组件获取redux中保存的状态
  NewComponent = connect((state) => ({ isLogin: state.userInfo.isLogin }), {})(NewComponent);
  return NewComponent;
}
