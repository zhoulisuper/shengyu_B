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
    this.props.store.promoStore.getPromoType();
  }
  promoTypeChange = async value => {
    const {
      store: { promoStore },
      form,
    } = this.props;
    if (form.getFieldValue('deptId1')) {
      form.setFieldsValue({
        deptId1: '-999999',
      });
    }
    await promoStore.getPromoSubType(value);
    if (this.props.name == 'promoPOParam') {
      promoStore.getPromoTypeSign(value);
      if (promoStore.promoPOParam.promoTypeSign == 4) {
        promoStore.setStateParam(this.props.name, 'thresholdType', '301');
        form.setFieldsValue({
          promoSubTypeId: '-999999',
        });
      } else if (promoStore.promoPOParam.promoTypeSign == 3) {
        promoStore.setStateParam(
          this.props.name,
          'thresholdType',
          promoStore.promoSubTypeList[0].thresholdType,
        );
        form.setFieldsValue({
          promoSubTypeId: promoStore.promoSubTypeList[0].id,
        });
      } else {
        promoStore.setStateParam(this.props.name, 'thresholdType', '-999999');
        form.setFieldsValue({
          promoSubTypeId: '-999999',
        });
      }
    } else if (this.props.name == 'promoSimulatorParam') {
      promoStore.setStateParam(
        this.props.name,
        'thresholdType',
        promoStore.promoSubTypeList[0].thresholdType,
      );
      form.setFieldsValue({
        promoSubTypeId: promoStore.promoSubTypeList[0].id,
      });
    } else {
      form.setFieldsValue({
        promoSubTypeId: '-999999',
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
        <Item {...FORMLABEL} label="促销类型">
          {form.getFieldDecorator('promoTypeId', {
            initialValue: initialValue,
            rules: [],
          })(
            <Select filterOption={filterOption} onChange={this.promoTypeChange}>
              {this.props.name == 'promoPOParam' ||
              this.props.name == 'promoSimulatorParam' ? null : (
                <Option value="-999999" key="-999999">
                  全部
                </Option>
              )}
              {promoStore.promoTypeList.map(item => (
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
