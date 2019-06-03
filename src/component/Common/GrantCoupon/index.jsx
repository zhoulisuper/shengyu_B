import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { Select, Form, Col } from 'antd';
import { FORMLABELDEPT } from 'utils/constant';
import filterOption from 'utils/filterOption';

const { Item } = Form;
const { Option } = Select;

@inject('store')
@observer
export default class extends React.Component {
  componentDidMount() {
    this.props.store.promoStore.getGrantCoupon();
  }
  @computed
  get disabled() {
    return this.props.form.getFieldValue('promoTypeId') &&
      this.props.form.getFieldValue('promoTypeId') != '5'
      ? true
      : false;
  }
  deptChange = v => {
    const {
      store: { common, promoStore },
      form,
    } = this.props;
    let deptId1 = common.priceBrandFiler(v, promoStore.deptId1List);
    Promise.resolve().then(() => {
      form.setFieldsValue({
        deptId1: deptId1,
      });
    });
  };
  render() {
    const { form, initialValue } = this.props;
    const {
      store: { promoStore },
    } = this.props;
    return (
      <Col span={12}>
        <Item {...FORMLABELDEPT} label="优惠券发劵部门">
          {form.getFieldDecorator('deptId1', {
            initialValue: this.disabled ? '-999999' : initialValue,
            rules: [],
          })(
            <Select
              filterOption={filterOption}
              mode="multiple"
              placeholder="全部"
              onChange={this.deptChange}
              disabled={this.disabled}
            >
              <Option value="-999999" key="-999999">
                全部
              </Option>
              {promoStore.deptId1List.map(item => (
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
