import React from 'react'
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {Button} from 'antd'
import {deleteUserInfo} from '../../redux/actions/login_action'

function Admin(props) {

  // console.log("Admin--props",props);

  // 删除redux，localStorage中保存的用户数据，修改了redux数据会自动更新页面
  const loginout = ()=>{
    // console.log("退出登录");
    props.deleteUserInfo()
  }

  const {isLogin} = props.userInfo

  // 当前没有登录时，强制跳转到Login页面
  if(!isLogin){
    // console.log("当前没有登录时，强制跳转到Login页面");
    return <Navigate to="/login" replace={true}/>
  }

  return (
    <div>
      <h1>hello,{props.userInfo.user.username}</h1>
      <Button type='primary' onClick={loginout}>退出登录</Button>
    </div>
  )
}

export default connect(
  state=>({userInfo:state.userInfo}),
  {deleteUserInfo}
)(Admin)
