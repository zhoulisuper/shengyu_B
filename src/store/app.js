import EventEmitter from 'events'
// import storeProp from 'src/storeProp'
// import fxios from 'tool/fxios'
// import { base as api } from 'src/api'

// @storeProp({
//   rest: [
//     {
//       name: 'me',
//       default: {},
//       fetch: {
//         url: api.me,
//       },
//     },
//   ],
//   setter: [
//     {
//       name: 'loading',
//       default: true,
//     },
//   ],
// })
class App extends EventEmitter {
  load = () => {
    console.log('333')
  }

  // logout = () => fxios.get(api.logout)
}

export default new App()