import axios from 'axios'

import { API_ENDPOINTS } from './Endpoints'
import { ResponseEnum } from './constant'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const GetAllPosts = async () => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.GET_ALL_POST}`

    console.log(url)

    const response = await axios.get(url,{
        withCredentials: true,
    })
    
    console.log(response.data, 'response')

    if (response.data.success === ResponseEnum.SUCCESS) {
      return response.data
    } else {
      return response.data
    }
  } catch (error) {
    console.error('Getting all post Error:', error)
    
return { success: false, message: error.message }
  }
}

export const CreatePost = async (postData) => {
  try {
    console.log('creating post')
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.CREATE_POST}`

    console.log(url)
    console.log('Post Data:', postData)

    const response = await axios.post(url, postData, {
      withCredentials: true,
       headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('Post creation response:', response)

    if (response.data.success === ResponseEnum.SUCCESS) {
      console.log(response.data, 'success to create post')
      
return response.data
    } else {
      console.log(response.data, 'failed to create post')
      
return response.data
    }
  } catch (error) {
    console.error('Creating post Error:', error)
    
return { success: false, message: error.message }
  }
}

// export const GetMyPost = async () => {
//   try {
//     console.log('get all post')
//     const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.GET_MY_POST}`
//     console.log('url of getting all my post', url)
//     const response = await axios.get(url, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       withCredentials: true
//     })
//     console.log(response.data.msg, 'response of getting my post')
//     if (response.data.success === ResponseEnum.SUCCESS) {
//       console.log(response.data.msg, 'success to create post')
//       return response.data.msg
//     } else {
//       console.log(response.data, 'failed to create post')
//       return response.data.msg
//     }
//   } catch (error) {
//     console.error('Creating post Error:', error)
//     return { success: false, message: error.message }
//   }
// }

export const GetPostById = async (id) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.GET_POST_BY_ID}${id}`

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

export const DeletPostById = async _id => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.DELETE_POST_BY_ID}${_id}`

    console.log(url, 'url of delete post by id')

    const response = await axios.delete(url, {
      withCredentials: true
    })

    console.log(response, 'response from delete post by id')
    console.log(response.data, 'res by data.msg')

    if (response.data.success === ResponseEnum.SUCCESS) {
      console.log(response.data, 'response after success')
      
return response.data
    }
  } catch (error) {
    console.error('deleting post by id Error:', error)
    
return { success: false, message: error.message }
  }
}

export const UpdatePostById = async (_id, updatedPost) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.UPDATE_POST_BY_ID}${_id}`

    console.log(url, 'url from update post by id')

    const response = await axios.put(url, updatedPost, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    console.log(response, 'response from updating post by id')
    console.log(response.data.msg, 'response.data.msg')

    if (response.data.success === ResponseEnum.SUCCESS) {
      console.log(response.data.msg, 'response.data.msg after success')
      
return response
    }
  } catch (error) {
    console.error('Update post by id Error:', error)
    
return { success: false, msg: error.msg }
  }
}

export const image = async formData => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.IMAGE}`

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    if (response.status === ResponseEnum.STATUS) {
      console.log(response.data, 'success in fetching image data')
      
return response.data
    }
  } catch (error) {
    console.error('Error in image API:', error)
    
return { success: false, message: error.message }
  }
}

export const exportPost= async () => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.EXPORT_POST}`;

    console.log(url, "url of export post");

    const response = await axios.get(url, {
      withCredentials: true,
      responseType: 'blob', // Important for file download
    });

    if (response.status === ResponseEnum.STATUS) {
      console.log(response.data, "success in exporting post data");
      
return response.data;
    }
  } catch (error) {
    console.error("Error in exportPost API:", error);
    
return { success: false, message: error.message };
  }
};

export const exportSinglePost= async (id) => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.EXPORT_SINGLE_POST}${id}`;

    console.log(url, "url of export post");

    const response = await axios.get(url, {
      withCredentials: true,
      responseType: 'blob', // Important for file download
    });

    if (response.status === ResponseEnum.STATUS) {
      console.log(response.data, "success in exporting post data");
      
return response.data;
    }
  } catch (error) {
    console.error("Error in exportPost API:", error);
    
return { success: false, message: error.message };
  }
};