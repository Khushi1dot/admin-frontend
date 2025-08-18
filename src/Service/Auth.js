import axios from "axios";

import { API_ENDPOINTS } from "./Endpoints";
import { ResponseEnum } from "./constant";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (object) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.REGISTER_USER}`;


    // console.log(url)
    const response = await axios.post(url, object, {
       withCredentials: true,
       headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // console.log(response, "response");

    if (response.data.success === ResponseEnum.SUCCESS) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("Registration Error:", error);
    
return { success: false, message: error.message };
  }
};


export const loginAdmin = async (object) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.LOGIN_ADMIN}`;

    console.log(url);

    const response = await axios.post(url, object, {
      headers: {
        "Content-Type": "application/json",
      },
       withCredentials: true,
    });

    console.log("data from login", response);
    console.log(response.status === ResponseEnum.STATUS, "response.status");
    console.log(response.data.success === ResponseEnum.SUCCESS, "response .success");

    if (response.data.success === ResponseEnum.SUCCESS) {
      console.log("data from login1", response.data);
      
return response.data;
    } else {
      console.log("Full response data from login:", response.data.message);
      throw new Error(response.data.message || "Invalid email or password");
    }
  } catch (error) {
    console.error("Login Error:", error);
    throw error;

    // return { success: false, message: error.message };
  }
};

export const getAdmin = async () => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.GET_ADMIN}`;

console.log(url,'urllll')

    const response = await axios.get(url, {
        withCredentials: true,
    });

    if (response.status === ResponseEnum.STATUS) {
      console.log(response.data, "success in fetching admin data");
      console.log(response,'afteriuiyhih');
      
return response.data;
     
    }
  } catch (error) {
    console.error("Error in getAdmin API:", error);
    
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
    console.error("Email Error:", error);
    
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
    console.error("Reset Password Error:", error);
    
return { success: false, message: error.message };
  }
};

export const updateById = async (id, updateData) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.UPDATE_BY_Id}${id}`;

    console.log(id,'id');
    console.log("Update URL:", url);

    const response = await axios.put(url, updateData, {
        headers: {
        'Content-Type': 'multipart/form-data',
      },
       withCredentials: true, 
    });

    console.log("Response from Update User:", response);

    console.log(response.status === ResponseEnum.STATUS, "response.status");
    console.log(response.data.success === ResponseEnum.SUCCESS,"response.success");

    if (response.data.success === ResponseEnum.SUCCESS) {
      console.log("User updated successfully:", response.data);
      
return response.data;
    } else {
      console.log("User update failed:", response.data);
      
return response.data;
    }
  } catch (error) {
    console.error("Update User Error:", error);
    
return { success: false, message: error.message };
  }
};

export const GetUserById = async (id) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.GET_USER_BY_ID}${id}`

    console.log(url, 'url of userId for getting posts')

    const response = await axios.get(url, {
      withCredentials: true
    })

    console.log(response.data, 'response from get post by id')

    if (response.data.success === ResponseEnum.SUCCESS) {
      console.log(response.data, 'response after success')
      
return response.data
    }
  } catch (error) {
    console.error('getting post by id Error:', error)
    
return { success: false, message: error.message }
  }
}


export const getAllUsers = async () => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.GET_ALL_USERS}`;

console.log(url,'urllll')

    const response = await axios.get(url, {
        withCredentials: true,
    });

    if (response.status === ResponseEnum.STATUS) {
      console.log(response.data, "success in fetching user data");
      console.log(response,'afteriuiyhih');
      
return response.data;
     
    }
  } catch (error) {
    console.error("Error in getUser API:", error);
    
return { success: false, message: error.message };
  }
};

export const deleteById = async (id) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.DELETE_BY_ID}${id}`;

    console.log(url, "url of delete account");

    const response = await axios.delete(url, {
     withCredentials: true, 
    });

    if (response.status === ResponseEnum.STATUS) {
      console.log(response.data, "success in deleting user data");
      
return response.data;
    }
  } catch (error) {
    console.error("Error in deleteUser API:", error);
    
return { success: false, message: error.message };
  }
};

export const exportUser= async () => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.EXPORT_USER}`;

    console.log(url, "url of export user");

    const response = await axios.get(url, {
      withCredentials: true,
      responseType: 'blob', // Important for file download
    });

    if (response.status === ResponseEnum.STATUS) {
      console.log(response.data, "success in exporting user data");
      
return response.data;
    }
  } catch (error) {
    console.error("Error in exportUser API:", error);
    
return { success: false, message: error.message };
  }
};


export const exportSingleUser= async (id) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.EXPORT_SINGLE_USER}${id}`;

    console.log(url, "url of export user");

    const response = await axios.get(url, {
      withCredentials: true,
      responseType: 'blob', // Important for file download
    });

    if (response.status === ResponseEnum.STATUS) {
      console.log(response.data, "success in exporting user data");
      
return response.data;
    }
  } catch (error) {
    console.error("Error in export user API:", error);
    
return { success: false, message: error.message };
  }
};