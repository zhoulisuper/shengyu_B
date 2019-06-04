import React from "react";
import { observer } from "mobx-react";
import { Select, Form, Col } from "antd";
import { FORMLABEL } from "utils/constant";
import filterOption from "utils/filterOption";

const { Item } = Form;
const { Option } = Select;
const STATUSMAP = [
  {
    label: "上架",
    id: "02"
  },
  {
    label: "下架",
    id: "03"
  }
];

@observer
class CommodityStatus extends React.Component {
  render() {
    const { form } = this.props;
    return (
      <Col span={6}>
        <Item {...FORMLABEL} label="上下架状态">
          {form.getFieldDecorator("commodityStatus", {
            rules: []
          })(
            <Select filterOption={filterOption}>
              {STATUSMAP.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )}
        </Item>
      </Col>
    );
  }
}
export default CommodityStatus;
