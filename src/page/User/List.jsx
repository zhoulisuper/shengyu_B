import { Button, Table, Spin } from "antd";
import { computed, toJS } from "mobx";
import React from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import PaginationInfo from "utils/pagination";

@inject("store")
@observer
class List extends React.Component {
  static propTypes = {
    store: PropTypes.shape({
      user: PropTypes.shape({
        list: PropTypes.array,
        showFormModal: PropTypes.func
      })
    }).isRequired
  };
  componentDidMount() {
    const {
      store: { user }
    } = this.props;
    user.createRecord({ pageNo: "1", pageSize: "20" });
  }

  @computed
  get columns() {
    return [
      {
        title: "consignee",
        dataIndex: "consignee"
      },
      {
        title: "cusPayAmt",
        dataIndex: "cusPayAmt"
      },
      {
        title: "mobPhoneNum",
        dataIndex: "mobPhoneNum"
      },
      {
        title: "orderId",
        dataIndex: "orderId"
      },
      {
        title: "orderStatus",
        dataIndex: "orderStatus"
      },
      {
        title: "orderTime",
        dataIndex: "orderTime"
      },
      {
        title: "payTime",
        dataIndex: "payTime"
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        render: (text, record, index) => (
          <Button size="small" data-index={index} onClick={this.onEdit}>
            编辑
          </Button>
        )
      }
    ];
  }

  onEdit = e => {
    const { index } = e.target.dataset;
    const { user } = this.props.store;
    const data = user.list[index];
    // store.setRecord(data);
    console.log(toJS(data));
    user.showFormModal();
  };

  render() {
    const { user } = this.props.store;
    return (
      <Spin spinning={user.spin}>
        <Table
          bordered={true}
          columns={this.columns}
          pagination={PaginationInfo(user)}
          dataSource={toJS(user.list)}
          rowKey="orderId"
        />
      </Spin>
    );
  }
}
export default List;
