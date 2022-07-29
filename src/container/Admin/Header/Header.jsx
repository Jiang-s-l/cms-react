import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Modal } from "antd";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import screenfull from "screenfull";
import dayjs from "dayjs";
import { deleteUserInfo } from "../../../redux/actions/login_action";
import { saveMenuTitle } from "../../../redux/actions/menu_action";
import "./header.less";
import { reqWeatherData } from "../../../api";
import items from "../../../config/congif-menu";

const { confirm } = Modal;

function Header(props) {
  // console.log(props.userInfo);

  // 获取redux中保存的用户信息
  const { username } = props.userInfo.user;

  // 当前是否为全屏：false==>不是,true==>是全屏
  const [isFull, setIsfull] = useState(false);

  // 日期时间
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"));

  // 天气信息
  let [weatherData, setWeatherData] = useState({});

  // 全屏切换
  const switchFullScreen = () => {
    screenfull.toggle();
  };

  // 请求天气信息(result为promise对象)
  const getWeatherData = async () => {
    // 只接收成功的结果
    let result = await reqWeatherData();
    // console.log(result);
    if (result.infocode === "10000") {
      const { ...pramas } = result.lives[0];
      weatherData = { ...pramas };
      setWeatherData(weatherData);
    }
  };

  let { pathname } = useLocation();
  let menuKey = pathname.split("/").reverse()[0];
  // 获取导航标题信息
  const getTitle = (menuKey) => {
    console.log("-------导航标题--------",props.menuTitle);
    let title = ''
    items.forEach((menuObj) => {
      if (menuObj.children instanceof Array) {
        let result = menuObj.children.find((menuChildObj) => {
          return menuChildObj.key === menuKey;
        });
        if(result) title =  result.label
      }else{
        if(menuObj.key === menuKey) title =  menuObj.label
      }
    });
    props.saveMenuTitle(title)
    return title
  };

  useEffect(() => {
    /* 组件已挂载执行 */

    // 检测全屏状态的改变
    screenfull.on("change", () => {
      setIsfull((isFull) => !isFull);
    });

    // 更新时间
    let timer = setInterval(() => {
      setDate((data) => dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);

    // 获取天气信息的方法
    getWeatherData();

    return () => {
      //在组件卸载之前执行
      // 清除定时器
      clearInterval(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 退出登录
  //删除redux，localStorage中保存的用户数据，修改了redux数据会自动更新页面
  const loginout = () => {
    confirm({
      title: "确定退出吗?",
      icon: <ExclamationCircleOutlined />,
      content: "若退出需要重新登录",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        //点击确定，执行退出登录操作
        // console.log('OK');
        props.deleteUserInfo();
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  return (
    <div className="header">
      <div className="header-top">
        <Button
          onClick={switchFullScreen}
          icon={isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          size="small"
        />
        <span className="name">欢迎 {username}</span>
        <Button type="link" size="small" onClick={loginout}>
          退出登录
        </Button>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">
          <span>{props.menuTitle ? props.menuTitle  : getTitle(menuKey)}</span>
        </div>
        <div className="header-bottom-right">
          <span>{date}</span>
          <img
            src="https://icosky.com/icon/png/Nature/Weather/Mostly%20Sunny.png"
            alt="天气图片"
          />
          <span>{weatherData.weather}</span>
          <span className="weather-text">温度：{weatherData.temperature}℃</span>
          <span>风向：{weatherData.winddirection}</span>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({ userInfo: state.userInfo, menuTitle:state.menuTitle }), {
  deleteUserInfo,saveMenuTitle
})(Header);
