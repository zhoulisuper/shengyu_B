import React from "react";
import { observer } from "mobx-react";
import { Input, Form, Col } from "antd";
import validateSkuIds from "utils/validateSkuIds";
import { FORMLABEL } from "utils/constant";
const { Item } = Form;

@observer
class SkuInput extends React.Component {
  render() {
    const { form } = this.props;
    return (
      <Col span={6}>
        <Item {...FORMLABEL} label="商品编码">
          {form.getFieldDecorator("skuCode", {
            rules: [
              {
                validator: validateSkuIds
              }
            ]
          })(<Input placeholder="选填；SKU间以逗号隔开" />)}
        </Item>
      </Col>
    );
  }
}

export default SkuInput;
