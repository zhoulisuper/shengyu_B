import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';
import { Form, Col, Icon, Row, InputNumber, message } from 'antd';

@inject('store')
@observer
export default class PricePop extends React.Component {
  @observable markId = 9;
  remove = k => {
    const { form } = this.props;
    let keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k && key !== k - 1),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length >= 10) {
      message.error('最多添加5条价格带', 3);
    } else {
      const nextKeys = keys.concat(++this.markId, ++this.markId);
      form.setFieldsValue({
        keys: nextKeys,
      });
    }
  };
  @computed get formItems() {
    const {
      form: { getFieldDecorator, getFieldValue },
      store: { promoStore },
    } = this.props;
    getFieldDecorator('keys', {
      initialValue: Array.from(
        Array(promoStore.priceEditParam.list.length),
        (v, k) => k,
      ),
    });
    let keys = getFieldValue('keys');
    return keys.map((k, index) => (
      <React.Fragment>
        {k % 2 === 0 ? (
          <React.Fragment>
            <Col key={k} span={9} style={{ height: '57px' }}>
              <Form.Item required={false}>
                {getFieldDecorator(`names[${k}]`, {
                  initialValue: promoStore.priceEditParam.list[k] || null,
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      message: '请输入价格带',
                    },
                  ],
                })(
                  <InputNumber
                    precision={0}
                    min={0}
                    style={{ width: '100%' }}
                    placeholder="start"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={3} style={{ textAlign: 'center', lineHeight: '38px' }}>
              -
            </Col>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Col key={k} span={9} style={{ height: '57px' }}>
              <Form.Item required={false}>
                {getFieldDecorator(`names[${k}]`, {
                  initialValue: promoStore.priceEditParam.list[k] || '999999',
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      message: '请输入价格带',
                    },
                  ],
                })(
                  <InputNumber
                    precision={0}
                    min={0}
                    style={{ width: '100%' }}
                    placeholder="end"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={3} style={{ textAlign: 'center', lineHeight: '38px' }}>
              <Icon type="delete" onClick={() => this.remove(k)} />
            </Col>
          </React.Fragment>
        )}
      </React.Fragment>
    ));
  }

  render() {
    return (
      <Row>
        <Col span={6} />
        <Col span={18}>
          <Row style={{ width: '200px' }}>
            {this.formItems}
            <Col span={12}>
              <Form.Item>
                <Icon
                  type="plus"
                  style={{ fontSize: '16px', fontWeight: '600' }}
                  onClick={this.add}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
