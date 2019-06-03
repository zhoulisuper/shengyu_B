const s = {
  setSession: (u, v) => sessionStorage.setItem(u, JSON.stringify(v)),
  getSession: v => JSON.parse(sessionStorage.getItem(v)),
  clearSession: v => sessionStorage.removeItem(v),
  clearCid: () => sessionStorage.removeItem('cid'),
  setLocalStorage: (u, v) => localStorage.setItem(u, JSON.stringify(v)),
  getLocalStorage: v => JSON.parse(localStorage.getItem(v)),
  clearLocalStorage: v => localStorage.removeItem(v),
};
export default s;
