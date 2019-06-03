/* 验证表单中的skuIds
 * 允许数字与英文逗号
 * */

const validReg = /^([,\s\n]*\d+[,\s\n]*)+$/;
export const invalidText =
  '请输入数字sku编号，多个编号用英文逗号，空格，或换行分割';

export default (rule, value, cb) => {
  if (value && !validReg.test(value)) {
    return cb(invalidText);
  }
  return cb();
};
