import React from "react";
import { observer, inject } from "mobx-react";
import { Form, Col, Button } from "antd";
import CommodityStatus from "common/CommodityStatus";
import CommodityName from "common/CommodityName";
import SkuInput from "common/SkuInput";
// import Loading from "component/Loading";

@Form.create()
@inject("store")
@observer
class Search extends React.Component {
  onQuery = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  clearSearch = () => {
    console.log("清空form");
  };
  render() {
    const { form } = this.props;
    return (
      <Form>
        <CommodityStatus form={form} />
        <CommodityName form={form} />
        <SkuInput form={form} />
        <Col span={6}>
          <Button type="primary" onClick={this.onQuery}>
            查询
          </Button>
          <Button type="primary" onClick={this.clearSearch}>
            重置
          </Button>
        </Col>
        {/* <Loading /> */}
      </Form>
    );
  }
}

export default Search;
