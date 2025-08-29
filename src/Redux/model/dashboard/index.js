import store from '../../store'
import * as Action from './Action'

const dashboardObj = {
  getSummary: (params) => store.dispatch(Action.getSummary(params)),
  getTopCategories: (params) => store.dispatch(Action.getTopCategories(params)),
  getTopContributors: (params) => store.dispatch(Action.getTopContributors(params)),
  getRecentUserActions: (params) => store.dispatch(Action.getRecentUserActions(params)),
  getRecentPostActions: (params) => store.dispatch(Action.getRecentPostActions(params)),
  getUserPostCorrelation: (params) => store.dispatch(Action.getUserPostCorrelation(params)),
  getSignupsByCountry: (params) => store.dispatch(Action.getSignupsByCountry(params)),
}

export default dashboardObj
