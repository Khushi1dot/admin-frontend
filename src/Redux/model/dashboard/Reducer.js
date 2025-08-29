import * as CONSTANT from './constant'

const initialState = {
  summary: {},
  heatmap: [],
  topCategories: [],
  topContributors: [],
  recentUserActions: [],
  recentPosts: [],
  userPostCorrelation: [],
  signupsByCountry: [],
  postsByCountry: [],
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT.SUMMARY:
      return { ...state, summary: action.payload }

    case CONSTANT.TOP_CATEGORIES:
      return { ...state, topCategories: action.payload }

    case CONSTANT.TOP_CONTRIBUTORS:
      return { ...state, topContributors: action.payload }

    case CONSTANT.RECENT_USER_ACTIONS:
      return { ...state, recentUserActions: action.payload }

    case CONSTANT.RECENT_POST_ACTIONS:
      return { ...state, recentPostActions: action.payload }

    case CONSTANT.USER_POST_CORRELATION:
      return { ...state, userPostCorrelation: action.payload }

    case CONSTANT.SIGNUPS_BY_COUNTRY:
      return { ...state, signupsByCountry: action.payload }

    default:
      return state
  }
}

export default dashboardReducer
