import { LocaleProvider } from "antd";
import { Router } from "react-router-dom";
import { Provider, observer } from "mobx-react";
import React from "react";
import PropTypes from "prop-types";
import Loading from "component/Loading";
import Layout from "component/Layout";

/*
 * 项目启动器
 * 请求加载初始数据
 * 开启监听各种事件
 * */
@observer
class App extends React.Component {
  static propTypes = {
    store: PropTypes.shape({
      app: PropTypes.shape({
        load: PropTypes.func
      })
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  // 监听页面错误

  componentDidMount() {
    const { store } = this.props;
    store.app.load();
  }

  componentWillUnmount() {
    this.dispose();
  }

  render() {
    const { store, routes, history } = this.props;
    return store.app.loading ? (
      <Loading />
    ) : (
      <>
        <Provider store={store}>
          <LocaleProvider>
            <Router history={history}>
              <Layout routes={routes} />
            </Router>
          </LocaleProvider>
        </Provider>
      </>
    );
  }
}

export default App;
