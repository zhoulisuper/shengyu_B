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
  @action
  setList = (v) => {
    this.list = v
  }
  fetchList(param) {
    return fetch(URL.userList, param).then(this.setFetchList)
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