import moment from 'moment';
import s from './session';
import {
  castArray,
  join,
  pick,
  keys
} from 'lodash';

/*
 *促销模块时间禁用的判断方法
 *要求可选近两年的月份，默认月份为近六个月，最大跨度一年
 */
export function disabledStart(startValue, endValue) {
  if (!startValue || !endValue) {
    return false;
  }
  return (
    startValue.valueOf() > endValue.valueOf() ||
    startValue.valueOf() <
    moment()
    .subtract(2, 'years')
    .format('X') *
    1000 ||
    startValue.valueOf() <
    moment(endValue)
    .subtract(11, 'month')
    .format('X') *
    1000
  );
}
export function disabledEnd(startValue, endValue) {
  if (!endValue || !startValue) {
    return false;
  }
  return (
    endValue.valueOf() < startValue.valueOf() ||
    endValue.valueOf() >
    moment(startValue)
    .add(1, 'years')
    .format('X') *
    1000 ||
    endValue.valueOf() > Date.now()
  );
}
//促销模块接口请求参数转换公共方法
export function getPromoParams(json) {
  let params = {};
  params.shopId = json.shopId;
  params.channelId = json.channelId;
  params.categoryId = join(castArray(json.categoryId), ',');
  params.categoryLevel = json.categoryLevel;
  params.brandId = join(castArray(json.brandId), ',');
  params.businessTypeId = json.businessTypeId;
  params.priceRange = json.priceRange;
  params.skuCode = json.skuCode;
  let dateArr = [];
  if (json.dateList) {
    json.dateList.forEach((ele, index) => {
      if (index % 2 === 0) {
        dateArr.push(
          `${moment(ele).format('YYYY-MM')}_${moment(
            json.dateList[index + 1],
          ).format('YYYY-MM')}`,
        );
      }
    });
  }
  params.monthRange = join(dateArr, ',');
  let thresholdArr = [];
  if (json.thresholdList) {
    json.thresholdList.forEach((ele, index) => {
      if (index % 2 === 0) {
        thresholdArr.push(`${ele}-${json.thresholdList[index + 1]}`);
      }
    });
  }
  params.threshold = join(thresholdArr, ',');
  params.thresholdType = json.thresholdType;
  params.promoTypeId = json.promoTypeId;
  params.promoSubTypeId = json.promoSubTypeId;
  params.realDiscountRange = json.realDiscountRange;
  params.deptId1 = join(castArray(json.deptId1), ',');
  params.promoMonth = moment(json.promoMonth).format('YYYY-MM');
  params.caixiao = json.caixiao;
  params.currentPage = json.currentPage;
  params.pageSize = json.pageSize;
  params.search = json.search;
  params.shopName = json.shopName;
  params.channelName = json.channelName;
  params.promoSubTypeName = json.promoSubTypeName;
  params.promoTypeName = json.promoTypeName;
  params.searchKey = json.searchKey;
  params.type = json.type;
  params.promoTarget = json.promoTarget;
  params.startTime = moment(json.startValue).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(json.endValue).format('YYYY-MM-DD HH:mm:ss');
  params = pick(params, keys(json));
  return params;
}
//促销模块本地查询参数存储公共方法
export function localPromoData(p) {
  let pData = s.getSession('localPromo') ? s.getSession('localPromo') : {};
  pData = Object.assign(pData, p);
  s.setSession('localPromo', pData);
}