import React from "react";
import { connect } from "react-redux";
import {Outlet} from 'react-router-dom'
import { deleteUserInfo } from "../../redux/actions/login_action";
import check_login from "../check_login/check_login";
import "./css/admin.less";
import Header from "./Header/Header";
import { Layout } from "antd";
import LeftNav from "./LeftNav/LeftNav";

const { Footer,Sider, Content } = Layout;

function Admin(props) {
  // console.log("Admin--props", props);

  return (
    <Layout className="admin">
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header />
        <Content className="content"><Outlet/></Content>
        <Footer className="footer">推荐使用谷歌浏览器，以便获得最好效果</Footer>
      </Layout>
    </Layout>
  );
}

export default connect((state) => ({ userInfo: state.userInfo }), {
  deleteUserInfo,
})(check_login(Admin));
