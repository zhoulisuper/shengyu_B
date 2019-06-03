import React from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Form, Col } from 'antd';
import Permission from 'components/Permission';
import { FORMLABEL } from 'utils/constant';
import filterOption from 'utils/filterOption';

const { Item } = Form;
const { Option } = Select;

@inject('store')
@observer
export default class ShopSelect extends React.Component {
  onChange = () => {
    this.props.form.setFieldsValue({
      priceRange: '-999999',
    });
  };
  render() {
    const {
      form,
      initialValue,
      store: { common },
    } = this.props;
    return (
      <Permission source="ShopName" isPublic>
        <Col span={6}>
          <Item {...FORMLABEL} label="店铺名称">
            {form.getFieldDecorator('shopId', {
              initialValue: initialValue,
              rules: [],
            })(
              <Select filterOption={filterOption} onChange={this.onChange}>
                {this.props.containAll ? (
                  <Option value="-999999" key="-999999">
                    全部
                  </Option>
                ) : null}
                {common.shopNameArray.map(item => (
                  <Option value={item.storeId} key={item.storeId}>
                    {item.storeName}
                  </Option>
                ))}
              </Select>,
            )}
          </Item>
        </Col>
      </Permission>
    );
  }
}
