import React from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Form, Col, Icon, Popover } from 'antd';
import filterOption from 'utils/filterOption';
import { FORMLABEL } from 'utils/constant';
import PricePop from 'components/promoComp/PricePop';
import styles from './style.m.less';

const { Item } = Form;
const { Option } = Select;

@inject('store')
@observer
export default class PriceRange extends React.Component {
  onClickPrice = () => {
    const {
      store: { promoStore },
    } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        for (let key in values) {
          promoStore.setStateParam(this.props.name, key, values[key]);
        }
      }
    });
    promoStore.promoPriceRange(-1, this.props.name);
  };
  handleVisibleChange = v => {
    const {
      store: { promoStore },
    } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        for (let key in values) {
          promoStore.setStateParam(this.props.name, key, values[key]);
        }
      }
    });
    promoStore.promoPriceRange(v, this.props.name);
    if (this.refs.pricePopComp) {
      this.refs.pricePopComp.resetFields();
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
        <div style={{ position: 'relative' }}>
          <Item {...FORMLABEL} label="价格带">
            {form.getFieldDecorator('priceRange', {
              initialValue: initialValue,
              rules: [],
            })(
              <Select
                showSearch
                filterOption={filterOption}
                style={{
                  paddingRight:
                    this.props.name == 'promoOptimizeStrength' ? '0' : '25px',
                }}
                onFocus={this.onClickPrice}
              >
                <Option value="-999999" key="-999999">
                  全部
                </Option>
                {promoStore.priceRangeCategory.length &&
                  promoStore.priceRangeCategory.map(item => (
                    <Option value={item.name} key={item.name}>
                      {item.name}
                    </Option>
                  ))}
              </Select>,
            )}
          </Item>
          {this.props.name == 'promoOptimizeStrength' ? null : (
            <div className={styles.edit}>
              <Popover
                content={<PricePop ref="pricePopComp" name={this.props.name} />}
                trigger="click"
                visible={promoStore.popVisible}
                onVisibleChange={this.handleVisibleChange}
                placement="bottom"
                width={300}
              >
                <Icon type="edit" />
              </Popover>
            </div>
          )}
        </div>
      </Col>
    );
  }
}
