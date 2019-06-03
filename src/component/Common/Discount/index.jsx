import React from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Form, Col } from 'antd';
import { FORMLABEL } from 'utils/constant';
import filterOption from 'utils/filterOption';

const { Item } = Form;
const { Option } = Select;

@inject('store')
@observer
export default class extends React.Component {
  componentDidMount() {
    this.props.store.promoStore.getDiscount();
  }
  render() {
    const { form, initialValue } = this.props;
    const {
      store: { promoStore },
    } = this.props;
    return (
      <Col span={6}>
        <Item {...FORMLABEL} label="折扣力度">
          {form.getFieldDecorator('realDiscountRange', {
            initialValue: initialValue,
            rules: [],
          })(
            <Select filterOption={filterOption}>
              <Option value="-999999" key="-999999">
                全部
              </Option>
              {promoStore.discountList.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>,
          )}
        </Item>
      </Col>
    );
  }
}
