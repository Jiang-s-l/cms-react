import React from "react";
import {useNavigate, Navigate} from 'react-router-dom'
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import {connect} from 'react-redux'
import {saveUserInfo} from '../../redux/actions/login_action'
import "./login.less";
import logo from "./images/logo.png";
import { reqLogin } from "../../api";


function Login(props) {
  // console.log("Login--props",props)

  // 返回一个函数实现编程式导航
  const navigate = useNavigate()

  const {isLogin} = props.userInfo

  // 当前已经登录，强制跳转到Admin页面
  if(isLogin){
    return <Navigate to="/admin" replace={true} />
  }
 
  // 解构出antd表单组件中的每一项
  const {Item} = Form

  // 密码的自定义验证
  const pswValidator = (rule, value) =>{
    // console.log("psw",value,!value)
    const length = value && value.length 
    const pwdReg = /^[a-zA-Z0-9_]+$/
    if (!value) { 
      return Promise.reject(new Error('请输入密码'))
    } 
    else if (length < 4) {
       return Promise.reject(new Error('密码必须大于 4 位'))
    } 
    else if (length > 12) {
       return Promise.reject(new Error('密码必须小于 12 位'))

    } 
    else if (!pwdReg.test(value)) {
       return Promise.reject(new Error('密码必须是英文、数组或下划线组成'))
      } 
    else { 
      return Promise.resolve(); 
    }
   

  }

  /* 表单提交方法
  2022.7.19理解：输入用户名和密码不合法时，提交方法不会执行，且不需要阻止默认提交 
  */
  const doLogin = async (values) => {
    // console.log('Received values of form: ', values);
    
    // 编码人员只管成功，失败在myAxios中的响应拦截器已封装
    let result =await reqLogin(values)
    const {status,data,msg} = result
    if(!result){
      message.error('登录出错，请刷新后重试');
    }
    else if(status === 0){//成功
      message.success('登录成功',2)
      // 使用useNavigate进行路由跳转
      navigate('/admin',{replace:true,})

      // 此处把data交给redux管理
      props.saveUserInfo(data)
    }
    else if(status === 1){//失败
      message.warning(msg)
    }

  };



  return (
    <div id="login" className="login">
      <div className="header">
        {/* 此时访问的是http://localhost:3000/images/logo.png */}
        {/* <img src="./images/logo.png" alt="Logo" /> */}
        <img src={logo} alt="Logo" />
        <h1>React项目：后台管理系统</h1>
      </div>
      <div className="content">
        <h1>用户登录</h1>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={doLogin}
        >
          <Item
            name="username"
            rules={[
              {required: true, message: "请输入您的用户名",},
              {min: 4, message: '用户名必须大于等于 4 位'},
              {max: 12, message: '用户名必须小于等于 12 位'},
              {pattern:/^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线 组成'}
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Item>
          {/* 密码的规则写为自定义规则 */}
          <Item 
            name="password"
            rules={[
              {validator:pswValidator}
            ]}
            >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Item>
        </Form>

      </div>
    </div>
  );
}

export default connect (
  state =>({userInfo:state.userInfo}),
  {saveUserInfo}
)(Login)
