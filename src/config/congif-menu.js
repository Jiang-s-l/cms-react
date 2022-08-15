import {
    AppstoreOutlined,
    HomeOutlined,
    UnorderedListOutlined,
    ToolOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  
function getItem(label, key, icon, children) {
    if(children){
      return {
        key,
        icon,
        children,
        label,
      };
    }else{
      return {
        key,
        icon,
        label,
      };
    }
    
  }
  
const items = [
    getItem("首页", "home", <HomeOutlined />),
    getItem("商品", "prod_about", <AppstoreOutlined />, [
      getItem("分类管理", "category", <UnorderedListOutlined />),
      getItem("商品管理", "product", <ToolOutlined />),
    ]),
    getItem("用户管理", "user", <UserOutlined />),
    getItem("角色管理", "role", <HomeOutlined />),
    getItem("图形图标", "charts", <AppstoreOutlined />, [
      getItem("柱状图", "bar"),
      getItem("折线图", "line"),
      getItem("饼图", "pie"),
    ]),
  ];
  console.log("配置页面值",items)

  export default  items