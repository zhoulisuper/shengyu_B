import React from 'react';
import { observer, inject } from 'mobx-react';
import { toJS, observable } from 'mobx';
import {
  Select,
  Form,
  Col,
  TreeSelect,
  message,
  Input,
  Popover,
  Tag,
  Row,
} from 'antd';
import { uniq, castArray } from 'lodash';
import { FORMLABELTWO } from 'utils/constant';
import { getCidNameByCid } from 'utils/getCidNameByCid';

const { Item } = Form;
const { Option } = Select;

@inject('store')
@observer
export default class BrandSelect extends React.Component {
  @observable
  dropDownVisiable = false;

  filterTreeNode = (input, treeNode) => {
    return treeNode.props.title && treeNode.props.title.indexOf(input) >= 0;
  };
  fetchBrand = (input, option) => {
    return (
      option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  };
  onChangeCategory = async (value, p, extra) => {
    const {
      store: { promoStore, common },
      form,
    } = this.props;
    let arr = [];
    if (extra.allCheckedNodes) {
      extra.allCheckedNodes.forEach(ele => {
        if (ele.node) {
          if (ele.node.cidLevel) {
            arr.push(ele.node.cidLevel);
          } else {
            arr.push(ele.node.props.cidLevel);
          }
        } else {
          arr.push(ele.props.cidLevel);
        }
      });
    }
    if (uniq(arr).length > 1) {
      message.warning('品类只支持同级多选');
      let ids = [];
      extra.preValue.forEach(ele => {
        ids.push(ele.value);
      });
      Promise.resolve().then(() => {
        form.setFieldsValue({
          categoryId: ids,
        });
      });
    } else {
      form.setFieldsValue({
        categoryLevel: uniq(arr)[0] ? uniq(arr)[0] : 0,
      });
      if (!this.dropDownVisiable) {
        common.getLoading(true);
        if (this.props.type) {
          await promoStore.getBrandByCidStrength(
            form.getFieldValue('categoryId'),
            form.getFieldValue('categoryLevel'),
          );
        } else {
          await promoStore.getBrandByCid(
            form.getFieldValue('categoryId'),
            form.getFieldValue('categoryLevel'),
          );
        }
        form.setFieldsValue({
          brandId: ['-999999'],
          priceRange: '-999999',
        });
        common.getLoading(false);
      }
    }
  };
  onDropdownVisibleChange = async visibled => {
    const {
      store: { promoStore, common },
      form,
    } = this.props;
    this.dropDownVisiable = visibled;
    if (visibled === false) {
      common.getLoading(true);
      if (this.props.type) {
        await promoStore.getBrandByCidStrength(
          form.getFieldValue('categoryId'),
          form.getFieldValue('categoryLevel'),
        );
      } else {
        await promoStore.getBrandByCid(
          form.getFieldValue('categoryId'),
          form.getFieldValue('categoryLevel'),
        );
      }
      form.setFieldsValue({
        brandId: ['-999999'],
        priceRange: '-999999',
      });
      common.getLoading(false);
    }
    return true;
  };
  onSearchBrand = value => {
    const {
      store: { common, promoStore },
      form,
    } = this.props;
    if (
      value &&
      common.isSuperAdmin &&
      form.getFieldValue('categoryId') == '-999999'
    ) {
      if (this.setTimeOut) {
        clearTimeout(this.setTimeOut);
        this.setTimeOut = null;
      }
      this.setTimeOut = setTimeout(async () => {
        common.getLoading(true);
        if (this.props.type) {
          await promoStore.getBrandBySearchStrength(value);
        } else {
          await promoStore.getBrandBySearch(value);
        }
        form.setFieldsValue({
          searchKey: value,
        });
        common.getLoading(false);
      }, 500);
    }
  };
  brandChange = v => {
    const {
      store: { common, promoStore },
      form,
    } = this.props;
    if (v && v.length > 10) {
      message.error('最多只能选择10个品牌！');
      form.setFieldsValue({
        brandId: v.pop(),
      });
    } else {
      let brandIds = common.priceBrandFiler(v, promoStore.brandList);
      Promise.resolve().then(() => {
        form.setFieldsValue({
          brandId: brandIds,
          priceRange: '-999999',
        });
      });
    }
  };
  maxTagPlaceholder = value => {
    let tagValue = [];
    let _arr = this.props.store.common.categoryPromoArray;
    value.map(item => {
      tagValue.push(getCidNameByCid(toJS(_arr), item));
    });
    const content = (
      <React.Fragment>
        {toJS(tagValue).map(b => (
          <Tag style={{ marginRight: '5px', marginBottom: '5px' }}>{b}</Tag>
        ))}
      </React.Fragment>
    );
    return (
      <Popover content={content}>
        <div>+ {value.length} ...</div>
      </Popover>
    );
  };
  chooseNearPick = async e => {
    const { id } = e.target.dataset;
    const {
      store: { promoStore, common },
    } = this.props;
    let category = id.split(',');
    common.getLoading(true);
    if (this.props.type) {
      await promoStore.getBrandByCidStrength(
        category[category.length - 1],
        category.length,
      );
    } else {
      await promoStore.getBrandByCid(
        category[category.length - 1],
        category.length,
      );
    }
    this.props.form.setFieldsValue({
      categoryId: category[category.length - 1],
      categoryLevel: category.length,
      brandId: '-999999',
      priceRange: '-999999',
    });
    common.getLoading(false);
  };
  render() {
    const {
      store: { promoStore, common },
      form,
    } = this.props;
    const list =
      this.props.type == 'Strength'
        ? promoStore.brandListStrength
        : promoStore.brandList;
    return (
      <Row style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-20px', left: '14px' }}>
          近期查询：
          {toJS(this.props.store.common.nearlyCidTypeTwo).map(b => (
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
              initialValue: this.props.categoryId,
            })(
              <TreeSelect
                maxTagCount={5}
                treeCheckable={true}
                maxTagPlaceholder={this.maxTagPlaceholder}
                filterTreeNode={this.filterTreeNode}
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                treeData={toJS(common.categoryPromoArray)}
                placeholder="请选择品类"
                style={{ width: '100%' }}
                onChange={this.onChangeCategory}
                onDropdownVisibleChange={this.onDropdownVisibleChange}
              />,
            )}
          </Item>
        </Col>
        <Col span={12}>
          <Item {...FORMLABELTWO} label="品牌">
            {form.getFieldDecorator('brandId', {
              initialValue: castArray(this.props.brandId),
            })(
              <Select
                style={{ width: '100%' }}
                showSearch
                filterOption={this.fetchBrand}
                mode="multiple"
                maxTagCount={3}
                placeholder="全部"
                onSearch={this.onSearchBrand}
                onChange={this.brandChange}
              >
                <Option value="-999999" key="-999999">
                  <span className="brandImg">
                    <img
                      src={
                        '//img10.360buyimg.com/uba/jfs/t16909/58/1547066613/382/a242de8b/5acdbf7cN5550e774.png'
                      }
                    />
                  </span>
                  全部品牌
                </Option>
                {list.map(ele => {
                  return (
                    <Option value={ele.brandId} key={ele.brandId}>
                      <span className="brandImg">
                        <img
                          src={
                            ele.logoUrl
                              ? ele.logoUrl
                              : '//img11.360buyimg.com/uba/jfs/t21691/263/1849385908/7803/4b220dec/5b3ad413N49e57556.png'
                          }
                        />
                      </span>
                      {ele.brandNameFull}
                    </Option>
                  );
                })}
              </Select>,
            )}
          </Item>
        </Col>
        <Col span={6} style={{ display: 'none' }}>
          <Item>
            {form.getFieldDecorator('categoryLevel', {
              initialValue: this.props.categoryLevel,
            })(<Input />)}
          </Item>
          <Item>
            {form.getFieldDecorator('searchKey', {
              initialValue: this.props.searchKey,
            })(<Input />)}
          </Item>
        </Col>
      </Row>
    );
  }
}
