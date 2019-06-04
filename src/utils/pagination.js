export default store => {
  return {
    pageSize: store.pageSize,
    current: store.pageNo,
    total: store.total,
    onChange: (current, size) => {
      store.setSpin(true);
      store.setPage(current, size);
      store.fetchList().then(() => {
        store.setSpin(false);
      });
    },
    showTotal: total => {
      return `共 ${total} 条记录`;
    },
    showQuickJumper: false,
    showSizeChanger: true,
    pageSizeOptions: ['20', '50', '100'],
    onShowSizeChange: (current, size) => {
      store.setSpin(true);
      store.setPage(current, size);
      store.fetchList().then(() => {
        store.setSpin(false);
      });
    },
  };
}