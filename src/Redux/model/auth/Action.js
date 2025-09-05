import { Auth } from '../../../Service/index'
import * as CONSTANTS from './constant'

// LOGIN ACTION
export const loginAdmin = object => async dispatch => {
  dispatch({ type: CONSTANTS.LOGIN_START })

  try {
    const response = await Auth.loginAdmin(object)

    console.log(response, 'respoense')


    // console.log("Login Response:", response.token);
    if (response.admin) {
      const { admin } = response

      // console.log(token, "token");
      console.log(admin, 'admin')

      dispatch({
        type: CONSTANTS.LOGIN_SUCCESSFULLY,
        payload: { admin  }
      })

      alert('Login successful')
      
return response
    } else {
      console.log('Invalid user:Login Failed')
      dispatch({ type: CONSTANTS.LOGIN_FAILURE })
      
return { success: false, message: "Invalid login" };
    }
  } catch (error) {
    console.error('Login error:', error)
    dispatch({ type: CONSTANTS.LOGIN_FAILURE })
    
return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
}



export const getAdmin = () => async dispatch => {
  try {
    console.log('getadmin running')
    const response = await Auth.getAdmin()

    console.log('getadmin in action.js', response)

   if (response && response.success) {

      dispatch({
        type: CONSTANTS.GET_ADMIN,
        payload: response.admin
      })
      console.log('admin get successfully', response)
      
return response.admin;
    }
  } catch (error) {
    console.error('fetching admin error:', error)
  }
}

// REGISTER ACTION
export const registerUser = object => async dispatch => {
  try {
    const response = await Auth.registerUser(object)

    console.log('Register Response:', response)

    if (response.success) {
      dispatch({ type: CONSTANTS.REGISTER_USER_SUCCESSFULLY })
      
return response
    } else {
      return response
    }
  } catch (error) {
    console.error('Register error:', error)
  }
}

export const forgotPassword = requestObject => async (dispatch, getState) => {
  try {
    const response = await Auth.forgotPassword_user(requestObject)

    console.log('forgot password:', response)

    if (response.success) {
      console.log(response)
      dispatch({ type: CONSTANTS.FORGOT_PASSWORD })
      
return response
    } else {
      return {
        success: true
      }
    }
  } catch (error) {
    console.log(error, 'error')
  }
}

export const resetPassword = requestObject => async (dispatch, getState) => {
  try {
    const response = await Auth.resetPassowrd_user(requestObject)

    console.log('reset password:', response)

    if (response.success) {
      console.log(response)
      dispatch({ type: CONSTANTS.RESET_PASSWORD })
      
return response
    }
  } catch (error) {
    console.log(error, 'error')
  }
}

export const updateById = (id, updateData) => async dispatch => {
  dispatch({ type: CONSTANTS.UPDATE_START })

  try {
    const response = await Auth.updateById(id, updateData)

    console.log(response, 'response of updating user.')

    if (response.success) {
      dispatch({
        type: CONSTANTS.UPDATE_SUCCESS,
        payload:  response.updatedUser,
      })

      // alert('Profile updated successfully')
      console.log(response, 'user data after updating')
      
return response
    } else {
      dispatch({ type: CONSTANTS.UPDATE_FAILURE })
    }
  } catch (error) {
    console.error('Update error:', error)
    dispatch({ type: CONSTANTS.UPDATE_FAILURE })
  }
}

export const getUserById = (id) => async(dispatch)=>{
  try{
    const response=await Auth.GetUserById(id);

    console.log(response,'response by action for get post by id');
  
    dispatch({
      type:CONSTANTS.GET_USER,
      payload:response,
    });
     console.log(response,'response after dispatch');
    
return response;

    // }
  }catch(error){
console.log(error, "issue in getting my profile");
    
return { success: false, msg: error.msg };
  }
}


export const getAllUsers = () => async dispatch => {
  try {
    console.log('getuser running')
    const response = await Auth.getAllUsers()

    console.log('getuser in action.js', response)

   if (response && response.success) {

      dispatch({
        type: CONSTANTS.GET_ALL_USERS,
        payload: response.users
      })
      console.log('user get successfully', response)
      
return response.users;
    }
  } catch (error) {
    console.error('fetching user error:', error)
  }
}

// LOGOUT ACTION
export const logout = () => async dispatch => {
  try {
    await Auth.logout(); // 🔥 call backend to remove cookie

    dispatch({ type: CONSTANTS.LOGOUT });
    dispatch({ type: CONSTANTS.GET_ADMIN, payload: { admin: null } });
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout action error:", error);
  }
};

export const deleteById = (id) => async dispatch => {
  try {
   
    const response = await Auth.deleteById(id)

    console.log('delete user response', response)

    if (response.success) {
      dispatch({ type: CONSTANTS.DELETE})
    }

    
return response
  } catch (error) {
    console.error('delete user error', error)
  }
}

export const exportUser = () => async dispatch => {
  try {
    const response = await Auth.exportUser();

    if (response) {
      dispatch({ type: CONSTANTS.EXPORT_USER, payload: response }); // include blob
      
return { success: true, data: response };
    } else {
      return { success: false, message: 'Export failed' };
    }
  } catch (error) {
    console.error('export user error:', error);
    
return { success: false, message: error.message };
  }
};

export const exportSingleUser = (id) => async dispatch => {
  try {
    const response = await Auth.exportSingleUser(id);

    if (response) {
      dispatch({ type: CONSTANTS.EXPORT_SINGLE_USER, payload: response }); // include blob
      
return { success: true, data: response };
    } else {
      return { success: false, message: 'Export failed' };
    }
  } catch (error) {
    console.error('export post error:', error);
    
return { success: false, message: error.message };
  }
};