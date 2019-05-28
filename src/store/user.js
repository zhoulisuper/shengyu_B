import Events from 'events'
import {
  observable,
  action
} from 'mobx'

class User extends Events {
  @observable
  list = {}

  @action
  setList = (v) => {
    this.list = v
    console.log(this.menu)
  }

  @observable
  record = {
    account: '',
    name: '',
    mail: '',
    mobile: '',
  }


  @action
  updateRecord = () => {
    console.log('更新')
  }
  @action
  createRecord = () => {
    console.log('新建')
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