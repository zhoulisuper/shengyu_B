import React from "react";
import { observer } from "mobx-react";
import { Select, Form, Col } from "antd";
import filterOption from "utils/filterOption";
import { FORMLABEL } from "utils/constant";
const { Item } = Form;
const { Option } = Select;

@observer
class ChannelSelect extends React.Component {
  render() {
    const { form, initialValue } = this.props;
    return (
      <Col span={6}>
        <Item {...FORMLABEL} label="渠道">
          {form.getFieldDecorator("channelId", {
            initialValue: initialValue,
            rules: []
          })(
            <Select showSearch filterOption={filterOption}>
              <Option value="-999999" key="-999999">
                全部
              </Option>
              <Option value="3" key="3">
                线上
              </Option>
              <Option value="2" key="2">
                线下
              </Option>
            </Select>
          )}
        </Item>
      </Col>
    );
  }
}
export default ChannelSelect;
