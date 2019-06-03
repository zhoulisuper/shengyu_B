import Moment from 'moment';

/*
 * 解析字符串为Moment实例
 * @param {any} value
 * @return {any}
 * */
export function parseMoment(value) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return Moment(value);
  }
  if (Array.isArray(value) && value.length > 0) {
    return value.map(v => parseMoment(v));
  }
  return value;
}

/*
 * 解析Moment实例到字符串
 * @param {any} value
 * @return {any}
 * */
export function formatMoment(value) {
  if (value instanceof Moment) {
    return value.format('YYYY-MM-DD');
  }
  if (Array.isArray(value) && value.length > 0) {
    return value.map(v => formatMoment(v));
  }
  return value;
}
