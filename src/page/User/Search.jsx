import React from "react";
import { observer, inject } from "mobx-react";
import { Form, Col, Button } from "antd";
import ShopSelect from "common/ShopSelect";
// import BusinessSelect from "common/BusinessSelect";
// import SkuInput from "common/SkuInput";
// import CateAndBrandSelect from "common/CateAndBrandSelect";
// import Export from "components/export";
import Loading from "component/Loading";
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
    // let stateParam = this.props.store.promoStore[this.props.name];
    const { form } = this.props;
    return (
      <Form>
        <ShopSelect form={form} />
        {/* <BusinessSelect form={form} />
        <SkuInput form={form} /> */}
        <Col span={6}>
          <Button type="primary" onClick={this.onQuery}>
            查询
          </Button>
          <Button type="primary" onClick={this.downLoad}>
            导出
          </Button>
        </Col>
        {/* <Export /> */}
        {/* <Loading /> */}
      </Form>
    );
  }
}

export default Search;
