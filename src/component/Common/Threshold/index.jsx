import React from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Col, InputNumber } from 'antd';
import { FORMLABELPRICE } from 'utils/constant';

const { Item } = Form;
const ThresholdText = {
  '201': ['满', '元', '减', '元'],
  '202': ['每满', '元', '减', '元'],
  '203': ['满', '元', '减', '元'],
  '204': ['满', '件', '享', '折'],
  '205': ['满', '件减', '最低', '件'],
  '206': ['每第', '件', '享', '折'],
  '207': ['满', '元', '享', '折'],
  '301': ['满', '元', '减', '元'],
};

@inject('store')
@observer
export default class extends React.Component {
  render() {
    const { form, initialValue } = this.props;
    return ThresholdText[this.props.type] ? (
      <Col span={6}>
        <Item
          {...FORMLABELPRICE}
          label={this.props.type == 301 ? '限额面额' : '门槛优惠'}
          style={{ display: 'inline-block' }}
        >
          {ThresholdText[this.props.type][0]}
          {form.getFieldDecorator('name[0]', {
            initialValue: initialValue[0],
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, message: '请填写门槛' }],
          })(
            <InputNumber
              precision={0}
              min={0}
              style={{ width: '55px', margin: '0 3px' }}
            />,
          )}
          {ThresholdText[this.props.type][1]}
        </Item>
        <Item style={{ display: 'inline-block' }}>
          {ThresholdText[this.props.type][2]}
          {form.getFieldDecorator('name[1]', {
            initialValue: initialValue[1],
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, message: '请填写门槛' }],
          })(
            <InputNumber
              precision={0}
              min={0}
              style={{ width: '55px', margin: '0 3px' }}
            />,
          )}
          {ThresholdText[this.props.type][3]}
        </Item>
      </Col>
    ) : null;
  }
}
