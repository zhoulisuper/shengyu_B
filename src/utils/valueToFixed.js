import { PLACEHOLDER } from './constant';

export default (value, n = 2) =>
  value === null ? PLACEHOLDER : Number(value).toFixed(n);
