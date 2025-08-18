'use client'

import { useEffect, useState } from 'react'

import {useRouter} from 'next/navigation';

import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton,Menu,MenuItem,Button,TextField,Snackbar, Alert,ListItemIcon,ListItemText ,Box,Tooltip} from '@mui/material';

import CustomAvatar from '@core/components/mui/Avatar'
import tableStyles from '@core/styles/table.module.css'
import { injectModels } from '../../Redux/injectModel'
import CreatePost from './createPost';
import PostDetailModal from './singlePost';
import ConfirmDelete from './confirmDelete';



const PostTable = (props) => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [anchorElMap, setAnchorElMap] = useState({});
  const router=useRouter();
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null)
const [isModalOpen, setIsModalOpen] = useState(false)
 const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletePostId, setDeletePostId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'error' or 'success'
  })

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await props.posts.getAllPosts()

        console.log(res.data,'jkgkigkjg');
        console.log(res,'uyguty')

        if (res.data && res.data.length > 0) {
          setPosts(res.data)
          setFilteredPosts(res.data);
        } else {
          throw new Error('Post list is empty or invalid')
        }
      } catch (err) {
        console.log('Error in fetchPosts:', err)
        setError('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])



const handleOpenMenu = (event, id) => {
  setAnchorElMap((prev) => ({ ...prev, [id]: event.currentTarget }));
};

const handleCloseMenu = (id) => {
  setAnchorElMap((prev) => ({ ...prev, [id]: null }));
};

// const handleView = (id) => {
//   router.push(`/posts/${id}`);
//   handleCloseMenu(id);
// };

const handleView = (id) => {
  setSelectedPostId(id)
  setIsModalOpen(true)
  handleCloseMenu(id)
}

const handleEdit = () => {
  // setSelectedPost(post);
  // setOpen(false);
  // handleCloseMenu(post._id);
};


 const handleDownload = async (id) => {
  try {
    const response = await props.posts.exportSinglePost(id); // Axios call that returns a Blob

console.log(response,'table post export');
showSnackbar('Post download successfully')


    // ✅ Axios returns blob in `response` directly
       if (response && response.data) {
      const blob = new Blob([response.data], { type: 'text/csv' });

      console.log(blob,'table post export blob')

    const url = window.URL.createObjectURL(blob);

    console.log(url,'table export res')
    const link = document.createElement('a');

    console.log(link,'table export link');
    link.href = url;
    link.download = 'post.csv'; // 🔽 File name
    link.click();
    window.URL.revokeObjectURL(url); // 🧹 Clean up
  }  else {
      throw new Error('Invalid response');
  }
    }catch (err) {
    console.error('Export failed:', err);
    alert('Failed to export post');
  }
};



   const handleDelete = (id) => {
    console.log("Deleting post:", id)
    setDeletePostId(id)
    setDeleteModalOpen(true)
  }

const confirmDeletePost = async () => {
  if (!deletePostId) {
    showSnackbar("No post selected to delete.")
    
return
  }

  setDeleteLoading(true)

  try {
    const res = await props.posts.deletePostById(deletePostId)

    if (res.success) {
      setPosts(prev => prev.filter(post => post._id !== deletePostId))
      showSnackbar('Post deleted successfully!')
    } else {
      showSnackbar('Failed to delete post.')
    }
  } catch (err) {
    console.error('Delete failed', err)
    showSnackbar('Delete failed due to server error.', err)
  } finally {
    setDeleteLoading(false)
    setDeleteModalOpen(false)
    setDeletePostId(null)
  }
}


 const handleExport = async () => {
  try {
    const response = await props.posts.exportPost(); // Axios call that returns a Blob

console.log(response,'table post export')
showSnackbar('Posts export successfully')


    // ✅ Axios returns blob in `response` directly
       if (response && response.data) {
      const blob = new Blob([response.data], { type: 'text/csv' });

      console.log(blob,'table post export blob')

    const url = window.URL.createObjectURL(blob);

    console.log(url,'table export res')
    const link = document.createElement('a');

    console.log(link,'table export link');
    link.href = url;
    link.download = 'posts.csv'; // 🔽 File name
    link.click();
    window.URL.revokeObjectURL(url); // 🧹 Clean up
  }  else {
      throw new Error('Invalid response');
  }
    }catch (err) {
    console.error('Export failed:', err);
    showSnackbar('Failed to export post');
  }
};


useEffect(() => {
  const filtered = posts.filter(post =>
    post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post?.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post?.categories?.join(', ')?.toLowerCase().includes(searchQuery.toLowerCase())||
    post?.createdAt?.toLowerCase().includes(searchQuery.toLowerCase())||
    post?.user.name?.toLowerCase().includes(searchQuery.toLowerCase()))

  setFilteredPosts(filtered);
}, [searchQuery, posts]);


  return (
   <>
   <Card className='p-4'>
     <div className='flex flex-col sm:flex-row justify-between gap-4 mb-4'>
      <Button
  variant="outlined"
  disableElevation
  className="!border-gray-400 !text-gray-500 inline-flex items-center gap-2 rounded-md bg-white  border-[1.5px] px-4 py-2 font-medium hover:bg-gray-50"
 onClick={handleExport}
>
  <svg
    className='h-4 w-4 text-gray-500'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M12 3v12m0 0l-4-4m4 4l4-4M4 17h16' />
  </svg>
  Export
</Button>

     <div className='flex gap-3'>
          <TextField
            label='Search'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            size='small'
            sx={{ minWidth: '250px' }}
          />
         <CreatePost/>
        </div>
      </div>

<div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title & Desc</th>
              <th>Author & Date</th>
              <th>Categories</th>
              <th>Stats</th>
              <th>Action</th>
             </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post, index) => {
const image = `http://localhost:5000/${post.images[0]?.replace(/\\/g, '/')}`;
const avatarUrl = `http://localhost:5000${post.user?.avatar?.replace(/\\/g, '/') || ''}`;


  const categories = post.categories;
              const createdAt = new Date(post.createdAt).toLocaleDateString()
              const author = post.user?.name || 'Unknown'
         

              return (
                <tr key={post._id || index}>
                  {/* Image */}
                  <td className='!plb-1'>
                    <img
                      src={image}
                      alt='Post'
                      width={60}
                      height={60}
                      style={{ objectFit: 'cover', borderRadius: '6px' }}
                    />
                  </td>

                  {/* Title & Desc */}
                  <td className='!plb-1'>
                    <Typography variant='h6'>{post.title.slice(0, 10)}...</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {post.desc.slice(0, 10)}...
                    </Typography>
                  </td>

                  {/* Author + Date */}
                  <td className='!plb-1'>
                    <div className='flex items-center gap-2'>
                      <CustomAvatar src={avatarUrl} size={34} />
                      <div className='flex flex-col'>
                        <Typography>{author}</Typography>
                        <Typography variant='caption' color='text.secondary'>{createdAt}</Typography>
                      </div>
                    </div>
                  </td>

                  {/* Categories */}
                  <td className='!plb-1'>
                    {categories.map((cat, i) => (
                      <Chip key={i} label={cat} size='small' className='me-1 mb-1' color='primary' />
                    ))}
                  </td>

                  {/* Like/Dislike/Comment Count */}
                  <td className='!plb-1'>
                    <div className='flex gap-3 items-center'>
                      <span title='Likes'>❤️ {post.likeCount}</span>
                      <span title='Dislikes'>👎 {post.dislikeCount}</span>
                      <span title='Comments'>💬 {post.commentCount}</span>
                    </div>
                  </td>

                  {/* Action */}

<td>
  <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
    <Tooltip title="Delete">
      <IconButton onClick={() => handleDelete(post._id)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="View">
      <IconButton onClick={() => handleView(post._id)}>
        <VisibilityIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="More">
      <IconButton onClick={(e) => handleOpenMenu(e, post._id)}>
        <MoreVertIcon />
      </IconButton>
    </Tooltip>

    <Menu
      anchorEl={anchorElMap[post._id]}
      open={Boolean(anchorElMap[post._id])}
      onClose={() => handleCloseMenu(post._id)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={() => handleDownload(post._id)}>
        <ListItemIcon>
          <DownloadIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </MenuItem>

      {/* <MenuItem onClick={() => handleEdit(post)}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </MenuItem> */}
    </Menu>
  </Box>
</td>


                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
        </Card>
    <PostDetailModal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      postId={selectedPostId}
    />

     <ConfirmDelete
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeletePost}
        loading={deleteLoading}
      />

      <Snackbar
  open={snackbar.open}
  autoHideDuration={4000}
  onClose={handleCloseSnackbar}

  // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <Alert
    onClose={handleCloseSnackbar}
    severity={snackbar.severity}
    sx={{ width: '100%' }}

    // variant="filled"
  >
    {snackbar.message}
  </Alert>
</Snackbar>

</>

  )
}

export default injectModels(['posts'])(PostTable)
