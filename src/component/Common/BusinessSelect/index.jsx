import React from "react";
import { observer, inject } from "mobx-react";
import { Select, Form, Col } from "antd";
import filterOption from "utils/filterOption";
import { FORMLABEL } from "utils/constant";

const { Item } = Form;
const { Option } = Select;

@inject("store")
@observer
class BusinessSelect extends React.Component {
  componentDidMount() {
    this.props.store.common.getBusiness();
  }
  render() {
    const { form, initialValue } = this.props;
    const {
      store: { common }
    } = this.props;
    return (
      <Col span={6}>
        <Item {...FORMLABEL} label="业务类型">
          {form.getFieldDecorator("businessTypeId", {
            initialValue: initialValue,
            rules: []
          })(
            <Select showSearch filterOption={filterOption}>
              {common.businessCategory.length &&
                common.businessCategory.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          )}
        </Item>
      </Col>
    );
  }
}

export default BusinessSelect;
