import React from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Radio, Button } from 'antd';
import { FORMLABEL } from 'utils/constant';
import PriceItem from './item.jsx';
const { Item } = Form;

const TypeOptions = [
  { value: '1', name: '页面价' },
  { value: '2', name: '成交价' },
];
const SubTypeOptions = [{ value: '1', name: '商品价格' }];
const WayOptions = [
  { value: 'default', name: '自动按价格分布聚类划分' },
  { value: 'define', name: '自定义' },
];

@Form.create()
@inject('store')
@observer
export default class PricePop extends React.Component {
  wayChange = e => {
    const {
      store: { promoStore },
    } = this.props;
    promoStore.setStateParam('priceEditParam', 'way', e.target.value);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          store: { promoStore },
        } = this.props;
        promoStore.setPriceEditParam({
          type: values.type,
          subType: values.subType,
          way: values.way,
          list: values.names && values.names.filter(v => v !== ''),
        });
        promoStore.updatePriceRange().then(() => {
          promoStore.setPopVisible(false);
        });
      }
    });
  };
  render() {
    const {
      form,
      store: { promoStore },
    } = this.props;
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Item {...FORMLABEL} label="参考价格">
            {form.getFieldDecorator('type', {
              initialValue: promoStore.priceEditParam.type,
              rules: [],
            })(
              <Radio.Group>
                {TypeOptions.map(b => (
                  <Radio key={b.value} value={b.value}>
                    {b.name}
                  </Radio>
                ))}
              </Radio.Group>,
            )}
          </Item>
          <Item {...FORMLABEL} label="价格类型">
            {form.getFieldDecorator('subType', {
              initialValue: promoStore.priceEditParam.subType,
              rules: [],
            })(
              <Radio.Group>
                {SubTypeOptions.map(b => (
                  <Radio key={b.value} value={b.value}>
                    {b.name}
                  </Radio>
                ))}
              </Radio.Group>,
            )}
          </Item>
          <Item {...FORMLABEL} label="划分方式">
            {form.getFieldDecorator('way', {
              initialValue: promoStore.priceEditParam.way,
              rules: [],
            })(
              <Radio.Group onChange={this.wayChange}>
                {WayOptions.map(b => (
                  <Radio key={b.value} value={b.value}>
                    {b.name}
                  </Radio>
                ))}
              </Radio.Group>,
            )}
          </Item>
        </Form>
        {promoStore.priceEditParam.way === 'define' ? (
          <PriceItem form={form} />
        ) : null}
        <div style={{ textAlign: 'center' }}>
          <Button type="dashed" onClick={this.handleSubmit}>
            确认
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
