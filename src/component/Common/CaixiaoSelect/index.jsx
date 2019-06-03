import React from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Form, Col } from 'antd';
import filterOption from 'utils/filterOption';
import { FORMLABEL } from 'utils/constant';

const { Item } = Form;
const { Option } = Select;

@inject('store')
@observer
export default class CaixiaoSelect extends React.Component {
  componentDidMount() {
    const {
      store: { promoStore, common },
    } = this.props;
    promoStore.setCaiXiaoList({ data: common.userInfoTree });
  }
  onSearchCaiXiao = value => {
    const {
      store: { promoStore, common },
    } = this.props;
    if (value && common.isSuperAdmin) {
      if (this.setTimeOut) {
        clearTimeout(this.setTimeOut);
        this.setTimeOut = null;
      }
      this.setTimeOut = setTimeout(() => {
        common.getLoading(true);
        promoStore.searchCaiXiao(value).then(() => {
          common.getLoading(false);
        });
      }, 500);
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
        <Item {...FORMLABEL} label="采销员ERP">
          {form.getFieldDecorator('caixiao', {
            initialValue: initialValue,
            rules: [],
          })(
            <Select
              showSearch
              filterOption={filterOption}
              onSearch={this.onSearchCaiXiao}
            >
              {promoStore.caixiaoList.length &&
                promoStore.caixiaoList.map(item => (
                  <Option value={item.code} key={item.code}>
                    {item.nameWithCode}
                  </Option>
                ))}
            </Select>,
          )}
        </Item>
      </Col>
    );
  }
}
