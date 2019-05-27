import React from "react";
import ReactDOM from "react-dom";
import { configure } from "mobx";
import moment from "moment";
import App from "./component/App";
import store from "./store";
import routes from "./route";
import "./style/index.less";
import "./style/animate.less";
import registerServiceWorker from "./registerServiceWorker";

// 设置moment语言
moment.locale("zh-cn");

// 设置mobx校验必须通过action更新数据
configure({
  enforceActions: "always"
});

ReactDOM.render(
  <App store={store} history={store.router.history} routes={routes} />,
  global.document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
} else {
  // production env
  registerServiceWorker();
}
