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
  onChange = value => {
    const {
      store: { promoStore },
    } = this.props;
    if (value == '-999999') {
      if (
        this.props.name == 'promoPOParam' &&
        promoStore.promoPOParam.promoTypeSign == 4
      ) {
        promoStore.setStateParam(this.props.name, 'thresholdType', '301');
      } else {
        promoStore.setStateParam(this.props.name, 'thresholdType', '-999999');
      }
    } else {
      promoStore.promoSubTypeList.forEach(ele => {
        if (ele.id == value) {
          promoStore.setStateParam(
            this.props.name,
            'thresholdType',
            ele.thresholdType,
          );
        }
      });
    }
  };
  render() {
    const {
      form,
      initialValue,
      store: { promoStore },
    } = this.props;
    return (
      <Col span={6}>
        <Item {...FORMLABEL} label="促销子类型">
          {form.getFieldDecorator('promoSubTypeId', {
            initialValue: initialValue,
            rules: [],
          })(
            <Select
              filterOption={filterOption}
              onChange={this.props.name ? this.onChange : null}
            >
              {this.props.name == 'promoPOParam' &&
              promoStore.promoPOParam.promoTypeSign == 3 ? null : this.props
                  .name == 'promoSimulatorParam' ? null : (
                    <Option value="-999999" key="-999999">
                  全部
                </Option>
              )}
              {promoStore.promoSubTypeList.map(item => (
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
