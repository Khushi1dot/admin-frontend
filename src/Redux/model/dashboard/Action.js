import * as CONSTANT from './constant'

// import { Dashboard } from '../../../Service/index'

import { Dashboard } from '@/Service/index'

// Dashboard summary action
export const getSummary =
  (params = {}) =>
  async dispatch => {
    try {
      const response = await Dashboard.GetDashboardSummary(params)

      if (response && response.success) {
        dispatch({
          type: CONSTANT.SUMMARY,
          payload: response
        })

        return response
      } else {
        throw new Error('⚠️ Failed to fetch summary:', response)
      }
    } catch (error) {
      throw new Error('🚨 Error fetching summary:', error)
    }
  }

export const getTopCategories = params => async dispatch => {
  try {
    const response = await Dashboard.GetTopCategories(params)
    
    if (response && response.success) {
      dispatch({
        type: CONSTANT.TOP_CATEGORIES,
        payload: response
      })

      return response
    } else {
      throw new Error('⚠️ Failed to fetch top categories:', response)
    }
  } catch (error) {
   throw new Error('Error fetching top categories:', error)
  }
}

export const getTopContributors = params => async dispatch => {
  try {
    const response = await Dashboard.GetTopContributors(params)
    
    if (response && response.success) {
      dispatch({
        type: CONSTANT.TOP_CONTRIBUTORS,
        payload: response
      })

      return response
    } else {
      throw new Error('⚠️ Failed to fetch top contributors:', response)
    }
  } catch (error) {
   throw new Error('Error fetching top contributors:', error)
  }
}

export const getRecentUserActions = params => async dispatch => {
  try {
    const response = await Dashboard.GetRecentUserActions(params)
    
    if (response && response.success) {
      dispatch({
        type: CONSTANT.RECENT_USER_ACTIONS,
        payload: response
      })
    
      return response
    } else {
      throw new Error('⚠️ Failed to fetch user activities:', response)
    }
  } catch (error) {
   throw new Error('Error fetching recent user actions:', error)
  }
}

export const getRecentPostActions = params => async dispatch => {
  try {
    const response = await Dashboard.GetRecentPostActions(params)
    
    if (response && response.success) {
      dispatch({
        type: CONSTANT.RECENT_POST_ACTIONS,
        payload: response
      })
    
      return response
    } else {
     throw new Error('⚠️ Failed to fetch post activities:', response)
    }
  } catch (error) {
    throw new Error('Error fetching recent posts:', error)
  }
}

export const getUserPostCorrelation =
  (params = {}) =>
  async dispatch => {
    try {
      const response = await Dashboard.GetUserPostCorrelation(params)
    
      if (response && response.success) {
        dispatch({
          type: CONSTANT.USER_POST_CORRELATION,
          payload: response
        })
    
        return response
      } else {
        throw new Error('⚠️ Failed to fetch user post correlation:', response)
      }
    } catch (error) {
    throw new Error('Error fetching user-post correlation:', error)
    }
  }

export const getSignupsByCountry = params => async dispatch => {
  try {
    const response = await Dashboard.GetSignupsByCountry(params)
    
    if (response && response.success) {
      dispatch({
        type: CONSTANT.SIGNUPS_BY_COUNTRY,
        payload: response
      })
    
      return response
    } else {
      throw new Error('⚠️ Failed to fetch signups by country:', response)
    }
  } catch (error) {
   throw new Error('Error fetching signups by country:', error)
  }
}
