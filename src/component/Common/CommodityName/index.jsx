import React from "react";
import { observer } from "mobx-react";
import { Form, Col, Input } from "antd";
import { FORMLABEL } from "utils/constant";

const { Item } = Form;

@observer
class CommodityName extends React.Component {
  render() {
    const { form } = this.props;
    return (
      <Col span={6}>
        <Item {...FORMLABEL} label="商品名称">
          {form.getFieldDecorator("commodityName", {
            rules: []
          })(<Input placeholder="商品名称" />)}
        </Item>
      </Col>
    );
  }
}

export default CommodityName;
