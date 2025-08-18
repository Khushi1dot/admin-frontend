import * as CONSTANT from './constant'

const initialState = {
  isLoggedin: false,
  access_token: null,
  registrationSuccess: false,
  user: null,
  users: [],
  admin: null,
  isFetching: false,
  error: false,
  exportSuccess: false,

}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT.LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: false
      }

    case CONSTANT.LOGIN_SUCCESSFULLY:
      return {
        ...state,

        // access_token: action.payload.token,
        admin: action.payload.admin,
        isLoggedin: true,
        isFetching: false,
        error: false
      }

    case CONSTANT.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        isLoggedin: false,

        // access_token: null,
        admin: null
      }

    case CONSTANT.GET_ADMIN:
      return {
        ...state,
        admin: action.payload,
        isFetching: false,
        error: false
      }

    case CONSTANT.REGISTER_USER_SUCCESSFULLY:
      return {
        ...state,
        registrationSuccess: true
      }
    case CONSTANT.FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordSuccess: true
      }
    case CONSTANT.RESET_PASSWORD:
      return {
        ...state,
        resetPasswordSuccess: true
      }
    case CONSTANT.UPDATE_START:
      return {
        ...state,
        isFetching: true,
        error: null
      }

    case CONSTANT.UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.role === 'user' ? action.payload : state.user,
        admin: action.payload.role === 'admin' ? action.payload : state.admin,
        isFetching: false,
        error: false
      }

    case CONSTANT.UPDATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }

    case CONSTANT.LOGOUT:
      return {
        ...initialState
      }

    case CONSTANT.GET_USER:
      return {
        ...state,
        user: action.payload,

        // access_token: state.access_token,
        isFetching: false,
        error: false
      }
    case CONSTANT.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        isFetching: false,
        error: false
      }
    case CONSTANT.DELETE:
      return {
        ...initialState
      }
    case CONSTANT.EXPORT_USER:
      return {
        ...state,
        exportSuccess: true,
        error: null,
      }
       case CONSTANT.EXPORT_SINGLE_USER:
      return {
        ...state,
        exportSuccess: true,
        error: null,
      }
    default:
      return state
  }
}

export default authReducer
