import EventEmitter from 'events'
import {
  observable,
  action,
} from 'mobx'

class App extends EventEmitter {
  @observable loading = true
  @observable me = {
    name: 'zhouli'
  }

  @action
  setLoading = v => {
    this.loading = v
  }
  load = () => {
    this.setLoading(false)
  }

  // logout = () => fxios.get(api.logout)
}

export default new App()