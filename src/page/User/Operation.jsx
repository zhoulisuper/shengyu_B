import { Button } from "antd";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import PropTypes from "prop-types";
import React from "react";

import CardTitle from "component/CardTitle";
import ConfirmButton from "component/ConfirmButton";

@inject("store")
@observer
class Operation extends React.Component {
  static propTypes = {
    store: PropTypes.shape({
      user: PropTypes.shape({
        list: PropTypes.array
      })
    }).isRequired
  };

  constructor(props) {
    super(props);
    const {
      store: { user }
    } = this.props;
    this.store = user;
  }

  destroy = () => {
    // const user = this.store;
    // user.destroyRecord(toJS(user.list));
  };

  render() {
    const user = this.store;
    return (
      <CardTitle>
        <Button type="primary" onClick={user.showFormModal}>
          添加
        </Button>
        <ConfirmButton type="danger" onConfirm={this.destroy}>
          删除
        </ConfirmButton>
      </CardTitle>
    );
  }
}
export default Operation;
