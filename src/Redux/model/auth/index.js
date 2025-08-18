import store from '../../store'
import * as Action from './Action'

// authObj is an object that has a logi method, which dispatches the login action from the action.js file
// to the Redux store.
const authObj = {
  loginAdmin: object => store.dispatch(Action.loginAdmin(object)),
  registerUser: object => store.dispatch(Action.registerUser(object)),
  getAdmin:() =>store.dispatch(Action.getAdmin()),
  getUser:id=>store.dispatch(Action.getUserById(id)),
  forgotPassword: requestObject => store.dispatch(Action.forgotPassword(requestObject)),
  resetPassword: requestObject => store.dispatch(Action.resetPassword(requestObject)),
  logout: () => store.dispatch(Action.logout()),
  update: (id, updateData) => store.dispatch(Action.updateById(id, updateData)),
  getAllUsers: () =>  store.dispatch(Action.getAllUsers()),
  delete: id => store.dispatch(Action.deleteById(id)),
  exportUser:()=>store.dispatch(Action.exportUser()),
  exportSingleUser:(id)=>store.dispatch(Action.exportSingleUser(id)),
}

export default authObj
