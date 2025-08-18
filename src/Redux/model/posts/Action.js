import { Posts } from "../../../Service/index";
import * as CONSTANT from "./constant";

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await Posts.GetAllPosts();

    console.log(response, "response");

    if (response.success) {
      console.log(response);
      dispatch({
        type: CONSTANT.GET_ALL_POSTS,
        payload: response.data,
      });
      
return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error, "res is not success");
  }
};

export const createPost = (formData) => async (dispatch) => {
  try {
    const response = await Posts.CreatePost(formData);

    console.log("Creating Post Response:", response);

   if (response.success) {
    dispatch({
      type: CONSTANT.CREATE_POST,
      payload: response.data,
      });
      
return response;
      } else {
        return response;
        }
  } catch (error) {
    console.log(error, "issue in creating post");
    
return { success: false, message: error.message };
  }
};

// export const getMyPost = () => async (dispatch) => {
//   try {
//     const token = localStorage.getItem("access_token");
//     const response = await Posts.GetMyPost(token);
//     console.log(response, "get my post by action");
//     if (response.token && response.user) {
//       const { user, token } = response;
//       console.log(user, "user");
//       console.log(token, "token");

//       dispatch({
//         type: CONSTANT.GET_MY_POST,
//         payload: { user, token },
//       });
//       console.log(response, "response");
//       return response;
//     } else {
//       return response;
//     }
//   } catch (error) {
//     console.log(error, "issue in getting my post");
//     return { success: false, msg: error.msg };
//   }
// };

export const getPostById = (id) => async(dispatch)=>{
  try{
    // const token=localStorage.getItem("access_token");
    const response=await Posts.GetPostById(id);

    console.log(response,'response by action for get post by id');

    // if(response){
    //   const{token}=response;
    //   console.log(token,'token by action');

    dispatch({
      type:CONSTANT.GET_POST_BY_ID,
      payload:response,
    });
     console.log(response,'response after dispatch');
    
return response;

    // }
  }catch(error){
console.log(error, "issue in getting my post");
    
return { success: false, msg: error.msg };
  }
}

export const deletePostById =(_id)=> async(dispatch)=>{
  try{
    const response=await Posts.DeletPostById(_id);

    console.log(response,'response by deleting posts');
    dispatch({
      type:CONSTANT.DELETE_POST_BY_ID,
      payload:response,
    })
    console.log(response,'response after dispatching in delete post');
    
return response;
  }catch(error){
    console.log(error, "issue in deleting post");
    
return { success: false, msg: error.msg };
  }
}

export const updatePostById=(id,updatedPost) => async(dispatch)=>{
  try{
    const token =localStorage.getItem('access_token');

    console.log(token,'token from update post by id');
   const response= await Posts.UpdatePostById(id,updatedPost,token);

   console.log(response,'response from update post by id from action');
   dispatch({
    type:CONSTANT.UPDATE_POST_BY_ID,
    payload:response,
   })
   console.log(response,'response of update post after dispacth');
   
return response;
  }catch(error){
    console.error(error,'issue in updating post.');
    
return{success:false,msg:error.msg};
  }
}

export const exportPost = () => async dispatch => {
  try {
    const response = await Posts.exportPost();

    if (response) {
      dispatch({ type: CONSTANT.EXPORT_POST, payload: response }); // include blob
      
return { success: true, data: response };
    } else {
      return { success: false, message: 'Export failed' };
    }
  } catch (error) {
    console.error('export post error:', error);
    
return { success: false, message: error.message };
  }
};

export const exportSinglePost = (id) => async dispatch => {
  try {
    const response = await Posts.exportSinglePost(id);

    if (response) {
      dispatch({ type: CONSTANT.EXPORT_SINGLE_POST, payload: response }); // include blob
      
return { success: true, data: response };
    } else {
      return { success: false, message: 'Export failed' };
    }
  } catch (error) {
    console.error('export post error:', error);
    
return { success: false, message: error.message };
  }
};
