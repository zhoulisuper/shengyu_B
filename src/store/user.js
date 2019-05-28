import Events from 'events'
import {
  observe
} from 'mobx'

class User extends Events {}

const store = new User()

// 关闭modal且将record还原
observe(store, 'formModal', ({
  newValue
}) => {
  if (!newValue) {
    store.restoreRecord()
  }
})

export default store