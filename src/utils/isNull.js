const isNull = v => {
  if (v === null) {
    return <div style={{ textAlign: 'center' }}>-</div>;
  }
  return v;
};

export default isNull;
