import axios from "axios";

import { API_ENDPOINTS } from "./Endpoints";
import { ResponseEnum } from "./constant";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (object) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.REGISTER_USER}`;


 
    const response = await axios.post(url, object, {
       withCredentials: true,
       headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    if (response.data.success === ResponseEnum.SUCCESS) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    
return { success: false, message: error.message };
  }
};


export const loginAdmin = async (object) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.LOGIN_ADMIN}`;


    const response = await axios.post(url, object, {
      headers: {
        "Content-Type": "application/json",
      },
       withCredentials: true,
    });

   
    if (response.data.success === ResponseEnum.SUCCESS) {
    
      
return response.data;
    } else {
      throw new Error(response.data.message || "Invalid email or password");
    }
  } catch (error) {
    throw error;

    // return { success: false, message: error.message };
  }
};

export const logout = async () => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.LOGOUT}`; // e.g., /api/logout

    const response = await axios.post(url, {}, {
      headers: {
        "Content-Type": "application/json",
      },  
      withCredentials: true, // 🔥 Important: to send cookies
    });

  
    if (response.data.success === ResponseEnum.SUCCESS) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Logout failed");
    }
  } catch (error) {
    throw error;
  }
};


export const getAdmin = async () => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.GET_ADMIN}`;


    const response = await axios.get(url, {
        withCredentials: true,
    });

    if (response.status === ResponseEnum.STATUS) {
      
return response.data;
     
    }
  } catch (error) {
    
return { success: false, message: error.message };
  }
};

export const forgotPassword_user = async (object) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.FORGOT_PASSWORD_USER}`;

    const response = await axios.post(url, object, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success === ResponseEnum.SUCCESS) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    
return { success: false, message: error.message };
  }
};

export const resetPassowrd_user = async (payload) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.RESET_PASSWORD_USER}`;

    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",

        //   Authorization: `Bearer ${token}`
      },
    });

    if (response.data.success === ResponseEnum.SUCCESS) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    
return { success: false, message: error.message };
  }
};

export const updateById = async (id, updateData) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.UPDATE_BY_Id}${id}`;

    const response = await axios.put(url, updateData, {
        headers: {
        'Content-Type': 'multipart/form-data',
      },
       withCredentials: true, 
    });


    if (response.data.success === ResponseEnum.SUCCESS) {
     
return response.data;
    } else {
      
return response.data;
    }
  } catch (error) {
    
return { success: false, message: error.message };
  }
};

export const GetUserById = async (id) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.GET_USER_BY_ID}${id}`

   
    const response = await axios.get(url, {
      withCredentials: true
    })

   
    if (response.data.success === ResponseEnum.SUCCESS) {
     
return response.data
    }
  } catch (error) {
    
return { success: false, message: error.message }
  }
}


export const getAllUsers = async () => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.GET_ALL_USERS}`;


    const response = await axios.get(url, {
        withCredentials: true,
    });

    if (response.status === ResponseEnum.STATUS) {
return response.data;
     
    }
  } catch (error) {
    
return { success: false, message: error.message };
  }
};

export const deleteById = async (id) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.DELETE_BY_ID}${id}`;

   
    const response = await axios.delete(url, {
     withCredentials: true, 
    });

    if (response.status === ResponseEnum.STATUS) {
      
return response.data;
    }
  } catch (error) {
    
return { success: false, message: error.message };
  }
};

export const exportUser= async () => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.EXPORT_USER}`;

   
    const response = await axios.get(url, {
      withCredentials: true,
      responseType: 'blob', // Important for file download
    });

    if (response.status === ResponseEnum.STATUS) {
     
return response.data;
    }
  } catch (error) {
    
return { success: false, message: error.message };
  }
};


export const exportSingleUser= async (id) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.EXPORT_SINGLE_USER}${id}`;

  
    const response = await axios.get(url, {
      withCredentials: true,
      responseType: 'blob', // Important for file download
    });

    if (response.status === ResponseEnum.STATUS) {
      
return response.data;
    }
  } catch (error) {
    
return { success: false, message: error.message };
  }
};