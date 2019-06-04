import Events from 'events'
import {
  observable,
  action
} from 'mobx'


import URL from 'api/serviceAPI';


import {
  fetch
} from 'api/api'
class User extends Events {
  @observable
  list = []
  @observable
  pageSize = 20
  @observable
  pageNo = 1
  @observable
  total = 50
  @observable
  spin = false

  @action
  setList = (v) => {
    this.list = v
  }
  @action
  setPage = (current, size) => {
    this.pageNo = current;
    this.pageSize = size
  }
  @action
  setSpin = (v) => {
    this.spin = v;
  }
  fetchList(param) {
    return fetch(URL.userList, Object.assign({}, param, {
      pageNo: this.pageNo,
      pageSize: this.pageSize
    })).then(this.setFetchList)
  }
  @action
  setFetchList = result => {
    this.list = result.orderList
  }


  @observable
  record = {
    account: '',
    name: '',
    mail: '',
    mobile: '',
  }
  updateRecord = (param) => {
    return fetch(URL.userList, param).then(this.setCreateRecord)
  }
  createRecord(param) {
    return fetch(URL.userList, param).then(this.setCreateRecord)
  }
  @action
  setCreateRecord = result => {
    this.list = result.orderList
  }


  @observable formModal = false
  @action
  hideFormModal = () => {
    this.formModal = false
  }
  @action
  showFormModal = () => {
    this.formModal = true
  }
}

const user = new User()
export default user