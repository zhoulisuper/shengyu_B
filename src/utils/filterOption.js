export default (input, option) => {
  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
