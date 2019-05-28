import React from "react";
import PropTypes from "prop-types";
import Layout from "antd/lib/layout";
import { observer, inject } from "mobx-react";
import Menu from "component/Menu";
import s from "./style.m.less";

const { Header } = Layout;

@inject("store")
@observer
class AppHeader extends React.Component {
  static propTypes = {
    store: PropTypes.shape({
      app: PropTypes.shape({
        logout: PropTypes.func,
        me: PropTypes.object
      })
    }).isRequired
  };

  render() {
    const {
      store: { app }
    } = this.props;
    return (
      <Header className={s.header}>
        <figure className={s.logo}>
          <img alt="logo" src="/asset/image/logo.png" />
          标题
        </figure>
        <Menu />
        <figure className={s.me}>
          {app.me.name}
          <button
            type="button"
            className={s.linkButton}
            onClick={app.logout}
            onKeyPress={app.logout}
          >
            [退出]
          </button>
        </figure>
      </Header>
    );
  }
}
export default AppHeader;
