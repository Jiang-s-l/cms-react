import React from "react-dom";
// import reactDOM from 'react-dom'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import 'antd/dist/antd.less'
import App from "./App";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

/* 官网代码
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>); */

// react18不再使用
// reactDOM.render(<App/>,document.getElementById('root'))
