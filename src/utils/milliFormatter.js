export default number =>
  number &&
  number.toString().replace(/\d+/, function(s) {
    return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
