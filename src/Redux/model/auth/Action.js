import { Auth } from '../../../Service/index'
import * as CONSTANTS from './constant'

// LOGIN ACTION
export const loginAdmin = object => async dispatch => {
  dispatch({ type: CONSTANTS.LOGIN_START })

  try {
    const response = await Auth.loginAdmin(object)

   
    if (response.admin) {
      const { admin } = response

     
      dispatch({
        type: CONSTANTS.LOGIN_SUCCESSFULLY,
        payload: { admin  }
      })
      
return response
    } else {
   
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
    
    const response = await Auth.getAdmin()

   
   if (response && response.success) {

      dispatch({
        type: CONSTANTS.GET_ADMIN,
        payload: response.admin
      })
      
return response.admin;
    }
  } catch (error) {
   throw new Error('fetching admin error:', error)
  }
}

// REGISTER ACTION
export const registerUser = object => async dispatch => {
  try {
    const response = await Auth.registerUser(object)


    if (response.success) {
      dispatch({ type: CONSTANTS.REGISTER_USER_SUCCESSFULLY })
      
return response
    } else {
      return response
    }
  } catch (error) {
   throw new Error('Register error:', error)
  }
}

export const forgotPassword = requestObject => async (dispatch, getState) => {
  try {
    const response = await Auth.forgotPassword_user(requestObject)

   

    if (response.success) {
  
      dispatch({ type: CONSTANTS.FORGOT_PASSWORD })
      
return response
    } else {
      return {
        success: true
      }
    }
  } catch (error) {
    throw new Error(error, 'error')
  }
}

export const resetPassword = requestObject => async (dispatch, getState) => {
  try {
    const response = await Auth.resetPassowrd_user(requestObject)

    
    if (response.success) {
     
      dispatch({ type: CONSTANTS.RESET_PASSWORD })
      
return response
    }
  } catch (error) {
    throw new Error(error, 'error')
  }
}

export const updateById = (id, updateData) => async dispatch => {
  dispatch({ type: CONSTANTS.UPDATE_START })

  try {
    const response = await Auth.updateById(id, updateData)

   
    if (response.success) {
      dispatch({
        type: CONSTANTS.UPDATE_SUCCESS,
        payload:  response.updatedUser,
      })

      
return response
    } else {
      dispatch({ type: CONSTANTS.UPDATE_FAILURE })
    }
  } catch (error) {
   throw new Error('Update error:', error)
    dispatch({ type: CONSTANTS.UPDATE_FAILURE })
  }
}

export const getUserById = (id) => async(dispatch)=>{
  try{
    const response=await Auth.GetUserById(id);

  
    dispatch({
      type:CONSTANTS.GET_USER,
      payload:response,
    });
    
return response;

   
  }catch(error){
// console.log(error, "issue in getting my profile");
    
return { success: false, msg: error.msg };
  }
}


export const getAllUsers = () => async dispatch => {
  try {

    const response = await Auth.getAllUsers()

  
   if (response && response.success) {

      dispatch({
        type: CONSTANTS.GET_ALL_USERS,
        payload: response.users
      })
      
return response.users;
    }
  } catch (error) {
   throw new Error('fetching user error:', error)
  }
}

// LOGOUT ACTION
export const logout = () => async dispatch => {
  try {
    await Auth.logout(); // 🔥 call backend to remove cookie

    dispatch({ type: CONSTANTS.LOGOUT });
    dispatch({ type: CONSTANTS.GET_ADMIN, payload: { admin: null } });
  } catch (error) {
  throw new Error("Logout action error:", error);
  }
};

export const deleteById = (id) => async dispatch => {
  try {
   
    const response = await Auth.deleteById(id)

   
    if (response.success) {
      dispatch({ type: CONSTANTS.DELETE})
    }

    
return response
  } catch (error) {
    throw new Error('delete user error', error)
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
    // console.error('export user error:', error);
    
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
    // console.error('export post error:', error);
    
return { success: false, message: error.message };
  }
};