
// 'use client'
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { injectModels } from '../../Redux/injectModel';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.extend(relativeTime);

// function SinglePost(props) {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     async function fetchPost() {
//       try {
//         const res = await props.posts.getPostById(id);
//         const data = res.data;
//         setPost(data);
//       } catch (err) {
//         console.error('Failed to fetch post:', err);
//       }
//     }

//     if (id) fetchPost();
//   }, [id]);

//   useEffect(() => {
//   if (post?.comments?.length) {
//     console.log('First comment userId:', post.comments[0].userId);
//   }
// }, [post]);


//   if (!post) return <p className="p-6">Loading...</p>;

//   const formattedCategories = post.categories

//   return (
//     <div className="flex flex-col md:flex-row p-6 gap-6">
//       {/* Main Content */}
//       <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-2/3">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
//         <p className="text-gray-700 mb-6">{post.desc}</p>

//         {/* Images */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
//           {post.images?.map((img, index) => (
//             <img
//               key={index}
//               src={`https://admin-backend-production-026a.up.railway.app/${img.replace(/\\/g, '/')}`}
//               alt={`Image ${index + 1}`}
//               className="rounded-md object-cover w-full"
//             />
//           ))}
//         </div>

//         {/* Categories */}
//         <div className="flex gap-2 flex-wrap mb-4">
//           {formattedCategories.map((cat, index) => (
//             <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
//               {cat}
//             </span>
//           ))}
//         </div>

//         {/* Post Stats */}
//         <div className="flex gap-4 text-sm text-gray-500 mb-4 justify-between items-center">
//            <div className="flex gap-4">
//           <span>👍 {post.likeCount}</span>
//           <span>👎 {post.dislikeCount}</span>
//           <span>💬 {post.commentCount} comments</span>
//           </div>
//           <p className="text-xs text-gray-500 mt-2">
//             {dayjs(post?.createdAt).fromNow()}
//           </p>

//         </div>
//       </div>

//       {/* Author & Comments */}
//       <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/3">
//         {/* Author */}
//         <div className="flex items-center gap-4 mb-6">
//           <img
//             src={`https://admin-backend-production-026a.up.railway.app${post.user?.avatar}`}
//             alt={post.user?.name}
//             className="w-14 h-14 rounded-full object-cover"
//           />
//           <div>
//             <h2 className="font-semibold text-lg">{post.user?.name}</h2>
//             <p className="text-sm text-gray-500">{post.user?.email}</p>
//           </div>
//         </div>

//         {/* Comments */}
//       {/* Comments */}
// <h3 className="text-md font-semibold mb-2">Recent Comments</h3>
// <div className="space-y-3 max-h-60 overflow-y-auto">
//   {post.comments?.map((comment) => (
//     <div key={comment._id} className="text-sm border-b pb-3 flex gap-3">
//       <img
//         src={ `https://admin-backend-production-026a.up.railway.app${comment.userId?.avatar}`}
//         alt={comment.userId?.name}
//         className="w-8 h-8 rounded-full object-cover"
//       />
//       <div className="flex-1">
//         <p className="font-semibold text-gray-800">{comment.userId?.name || 'Unknown'}</p>
//         <p className="text-gray-700">
//           {comment.text} {comment.emoji ?? ''}
//         </p>
//         <p className="text-xs text-gray-500 mt-1">
//         {dayjs(comment.createdAt).fromNow()}
//       </p>
//       </div>
//     </div>
//   ))}
// </div>

//       </div>
//     </div>
//   );
// }

// export default injectModels(['posts'])(SinglePost);


// components/PostDetailModal.jsx
'use client'

import { useEffect, useState } from 'react'

import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Divider
} from '@mui/material'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { injectModels } from '../../Redux/injectModel'

dayjs.extend(relativeTime)

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', sm: '80vw', md: '600px' },
  maxWidth: 800,
  bgcolor: 'background.paper',

  // boxShadow: 24,
  p: 0,
   overflow: 'hidden', 
borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  maxHeight: '80vh',
 overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none', 
}

function PostDetailModal({ open, onClose, postId, posts }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return
      setLoading(true)

      try {
        const res = await posts.getPostById(postId)

        setPost(res?.data)
      } catch (err) {
        console.error('Error fetching post details:', err)
      } finally {
        setLoading(false)
      }
    }

    if (open) fetchPost()
  }, [postId, open])

  return (
   <Modal open={open} onClose={onClose}>
  <Box sx={modalStyle}  className="hide-scrollbar">
    {loading ? (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    ) : post ? (
      <Box className="space-y-4" sx={{ p: 3 }}> {/* ← Add padding here */}
        {/* Title & Description */}
        <Typography variant="h4">
          <span className='text-gray-500'>Title:</span> {post.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <span className='text-gray-500'>Desc:</span> {post.desc}
        </Typography>

        {/* Images */}
        {post.images?.length > 0 && (
          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {post.images.map((img, idx) => (
              <img
                key={idx}
                src={`https://admin-backend-production-026a.up.railway.app/${img.replace(/\\/g, '/')}`}
                className="rounded-md w-full object-cover"
                style={{ maxHeight: 300 }}
                alt={`post-img-${idx}`}
              />
            ))}
          </Box>
        )}

        {/* Categories */}
        <Box display="flex" gap={1} flexWrap="wrap">
          {post.categories?.map((cat, i) => (
            <Box
              key={i}
              px={2}
              py={0.5}
              bgcolor="#e0f2ff"
              color="#007acc"
              fontSize="12px"
              borderRadius="9999px"
              fontWeight={600}
            >
              {cat}
            </Box>
          ))}
        </Box>

        {/* Stats */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
          color="gray"
          fontSize={14}
        >
          <Box display="flex" gap={3}>
            <span>👍 {post.likeCount}</span>
            <span>👎 {post.dislikeCount}</span>
            <span>💬 {post.commentCount}</span>
          </Box>
          <span>{dayjs(post.createdAt).fromNow()}</span>
        </Box>

        <Divider />

        {/* Author Info */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={`https://admin-backend-production-026a.up.railway.app${post.user?.avatar}`}
            alt={post.user?.name}
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography fontWeight={600}>{post.user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.user?.email}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Comments */}
        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Comments
        </Typography>
        <Box maxHeight={250} overflow="auto">
          {post.comments?.length ? (
            post.comments.map((c) => (
              <Box
                key={c._id}
                display="flex"
                gap={2}
                py={1.5}
                borderBottom="1px solid #eee"
              >
                <Avatar
                  src={`https://admin-backend-production-026a.up.railway.app${c.userId?.avatar}`}
                  alt={c.userId?.name}
                  sx={{ width: 32, height: 32 }}
                />
                <Box>
                  <Typography fontWeight={500} variant="body2">
                    {c.userId?.name}
                  </Typography>
                  <Typography variant="body2">
                    {c.text} {c.emoji}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {dayjs(c.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No comments yet.
            </Typography>
          )}
        </Box>
     

      <Divider />

{/* Likes */}
<Typography variant="subtitle1" fontWeight={600} mt={2}>
  Liked By
</Typography>
<Box maxHeight={150} overflow="auto">
  {post.likes?.length ? (
    post.likes.map(user => (
      <Box
        key={user._id}
        display="flex"
        alignItems="center"
        gap={2}
        py={1}
        borderBottom="1px solid #eee"
      >
        <Avatar
          src={`https://admin-backend-production-026a.up.railway.app${user.avatar}`}
          alt={user.name}
          sx={{ width: 32, height: 32 }}
        />
        <Typography variant="body2">{user.name}</Typography>
        {/* <Typography variant="caption" color="text.secondary">{user.email}</Typography> */}

      </Box>
    ))
  ) : (
    <Typography variant="body2" color="text.secondary">
      No likes yet.
    </Typography>
  )}
</Box>

{/* Dislikes */}
<Typography variant="subtitle1" fontWeight={600} mt={2}>
  Disliked By
</Typography>
<Box maxHeight={150} overflow="auto">
  {post.dislikes?.length ? (
    post.dislikes.map(user => (
      <Box
        key={user._id}
        display="flex"
        alignItems="center"
        gap={2}
        py={1}
        borderBottom="1px solid #eee"
      >
        <Avatar
          src={`https://admin-backend-production-026a.up.railway.app${user.avatar}`}
          alt={user.name}
          sx={{ width: 32, height: 32 }}
        />
        <Typography variant="body2">{user.name}</Typography>
        {/* <Typography variant="caption" color="text.secondary">{user.email}</Typography> */}
      </Box>
    ))
  ) : (
    <Typography variant="body2" color="text.secondary">
      No dislikes yet.
    </Typography>
  )}
</Box>
 </Box>

    ) : (
      <Typography>No post found.</Typography>
    )}
  </Box>
</Modal>

  )
}

export default injectModels(['posts'])(PostDetailModal)

