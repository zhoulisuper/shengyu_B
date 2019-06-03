import React from "react";
import { observer, inject } from "mobx-react";
import { computed, observable } from "mobx";
import { Form, Col, Icon, Row, message, DatePicker } from "antd";
import { FORMLABEL } from "utils/constant";
import { disabledStart, disabledEnd } from "utils/promoModular";
import moment from "moment";
const { MonthPicker } = DatePicker;

const formLabel = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 17
  }
};

@inject("store")
@observer
class DateRange extends React.Component {
  @observable markId = 5;
  constructor(props) {
    super(props);
    this.state = {
      disabledDate: null
    };
  }
  remove = k => {
    const { form } = this.props;
    let keys = form.getFieldValue("keys");
    keys = keys.filter(key => key !== k);
    keys = keys.filter(key => key !== k - 1);
    form.setFieldsValue({
      keys: keys
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length >= 6) {
      message.error("最多添加3个日期区间", 3);
    } else {
      const nextKeys = keys.concat(++this.markId, ++this.markId);
      form.setFieldsValue({
        keys: nextKeys
      });
    }
  };
  disabledStartDate = v => {
    return disabledStart(v, this.state.disabledDate);
  };

  disabledEndDate = v => {
    return disabledEnd(this.state.disabledDate, v);
  };
  onFocus = (type, k) => {
    let value =
      type === "start"
        ? this.props.form.getFieldValue(`names[${k + 1}]`)
        : this.props.form.getFieldValue(`names[${k - 1}]`);
    this.setState({ disabledDate: value });
  };
  @computed get formItems() {
    const {
      form: { getFieldDecorator, getFieldValue },
      dateList
    } = this.props;
    getFieldDecorator("keys", {
      initialValue: Array.from(Array(dateList.length), (v, k) => k)
    });
    let keys = getFieldValue("keys");
    return keys.map((k, index) => (
      <Col key={k} span={6}>
        {k % 2 === 0 ? (
          <Form.Item {...FORMLABEL} label="开始日期">
            {getFieldDecorator(`names[${k}]`, {
              initialValue: dateList[k]
                ? moment(dateList[k])
                : moment().subtract(5, "month"),
              validateTrigger: ["onChange", "onBlur"]
            })(
              <MonthPicker
                style={{ width: "100%" }}
                allowClear={false}
                onFocus={() => {
                  this.onFocus("start", k);
                }}
                disabledDate={this.disabledStartDate}
                format="YYYY-MM"
                placeholder="Start"
              />
            )}
          </Form.Item>
        ) : (
          <Row>
            <Col key={`content${k}`} span={22}>
              <Form.Item {...formLabel} label="结束日期">
                {getFieldDecorator(`names[${k}]`, {
                  initialValue: dateList[k] ? moment(dateList[k]) : moment(),
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <MonthPicker
                    style={{ width: "100%" }}
                    allowClear={false}
                    onFocus={() => {
                      this.onFocus("end", k);
                    }}
                    disabledDate={this.disabledEndDate}
                    format="YYYY-MM"
                    placeholder="end"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={2} key={`icon${k}`} style={{ textAlign: "center" }}>
              {index === 1 ? (
                <Icon
                  style={{ lineHeight: "30px" }}
                  type="plus-circle-o"
                  onClick={() => this.add(k)}
                />
              ) : (
                <Icon
                  style={{ lineHeight: "30px" }}
                  type="minus-circle-o"
                  onClick={() => this.remove(k)}
                />
              )}
            </Col>
          </Row>
        )}
      </Col>
    ));
  }

  render() {
    return <React.Fragment>{this.formItems}</React.Fragment>;
  }
}

export default DateRange;
