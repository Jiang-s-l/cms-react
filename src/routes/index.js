import { Navigate } from "react-router-dom";
import Admin from "../container/Admin";
import Login from "../container/Login";
import Home from "../components/Home/Home";
import Category from "../container/Category/Category";
import Product from "../container/Product/Product";
import AddUpdate from "../container/Product/Add_update";
import Detail from "../container/Product/Detail";
import User from "../container/User/User";
import Role from "../container/Role/Role";
import Bar from "../container/Bar/Bar";
import Line from "../container/Line/Line";
import Pie from "../container/Pie/Pie";

const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "*", //*代表在/后输入的值只要不匹配，就会跳转到此组件
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "*",
        element: <Navigate to="/admin/home" />,
      },
      {
        path: "",
        element: <Navigate to="/admin/home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "prod_about",
        children: [
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "product",
            children:[
              {
                path:'',
                element: <Product />,
              },
              {
                path:'add_update',
                element:<AddUpdate/>
              },
              {
                path:'detail/:id',
                element:<Detail/>
              }
            ]
          },
        ],
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "role",
        element: <Role />,
      },
      {
        path: "charts",
        children: [
          {
            path: "bar",
            element: <Bar />,
          },
          {
            path: "line",
            element: <Line />,
          },
          {
            path: "pie",
            element: <Pie />,
          },
        ],
      },
    ],
  },
];

export default routes;
