import React from "react";
import { observer, inject } from "mobx-react";
import { Form, Col, Button } from "antd";
import ShopSelect from "components/promoComp/ShopSelect";
import BusinessSelect from "components/promoComp/BusinessSelect";
import SkuInput from "components/promoComp/SkuInput";
import CateAndBrandSelect from "components/promoComp/CateAndBrandSelect";
import Export from "components/export";
import Loading from "components/loading";
import { getPromoParams } from "utils/promoModular";

@Form.create()
@inject("store")
@observer
class Search extends React.Component {
  onQuery = () => {
    const {
      store: { promoStore, baselineQuery, common }
    } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        for (let key in values) {
          promoStore.setStateParam(this.props.name, key, values[key]);
        }
        common.getLoading(true);
        await common.saveAndGet(promoStore.baselineQueryParam.categoryId, 2);
        await baselineQuery.getTableList();
        common.getLoading(false);
      }
    });
  };
  downLoad = () => {
    const {
      store: { baselineQuery, common }
    } = this.props;
    common.setExportUrl("promo/baseline/excel/sku");
    let json = getPromoParams(baselineQuery.timer);
    common.setParams(json);
    common.setExportVisible(true);
  };
  render() {
    let stateParam = this.props.store.promoStore[this.props.name];
    const { form } = this.props;
    return (
      <Form>
        <CateAndBrandSelect
          form={form}
          categoryId={stateParam.categoryId}
          brandId={stateParam.brandId}
          categoryLevel={stateParam.categoryLevel}
          searchKey={stateParam.searchKey}
        />
        <ShopSelect form={form} initialValue={stateParam.shopId} />
        <BusinessSelect form={form} initialValue={stateParam.businessTypeId} />
        <SkuInput form={form} initialValue={stateParam.skuCode} />
        <Col span={6}>
          <Button type="primary" onClick={this.onQuery}>
            查询
          </Button>
          <Button type="primary" onClick={this.downLoad}>
            导出
          </Button>
        </Col>
        <Export />
        <Loading />
      </Form>
    );
  }
}

export default Search;
