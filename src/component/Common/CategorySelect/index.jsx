import React from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Col, Cascader } from 'antd';
import { FORMLABELTWO } from 'utils/constant';
import { castArray } from 'lodash';
import { toJS } from 'mobx';

const { Item } = Form;

@inject('store')
@observer
export default class SkuInput extends React.Component {
  chooseNearPick = e => {
    const { id } = e.target.dataset;
    let category = [];
    id.split(',').forEach(ele => {
      category.push(parseInt(ele));
    });
    this.props.form.setFieldsValue({
      categoryId: category,
    });
    this.props.handleChange(category);
  };
  render() {
    const {
      form,
      initialValue,
      store: { common },
    } = this.props;
    let displayRender = label => label[label.length - 1];
    return (
      <React.Fragment>
        <div style={{ position: 'absolute', top: '-20px', left: '14px' }}>
          近期查询：
          {toJS(common.nearlyCidTypeOne).map(b => (
            <a
              onClick={this.chooseNearPick}
              data-id={b.id}
              key={b.name}
              style={{
                color: '#debb6b',
                lineHeight: '20px',
                marginRight: '20px',
              }}
            >
              {b.name}
            </a>
          ))}
        </div>
        <Col span={12}>
          <Item {...FORMLABELTWO} label="品类">
            {form.getFieldDecorator('categoryId', {
              initialValue: castArray(initialValue),
              rules: [],
            })(
              <Cascader
                showSearch
                allowClear={false}
                options={toJS(common.categoryArray)}
                displayRender={displayRender}
                expandTrigger="hover"
              />,
            )}
          </Item>
        </Col>
      </React.Fragment>
    );
  }
}
