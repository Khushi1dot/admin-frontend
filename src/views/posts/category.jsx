'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityIcon from '@mui/icons-material/Visibility'

import DeleteIcon from '@mui/icons-material/Delete'

import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  Snackbar,
  Alert,
  Pagination,
  ListItemText,
  Box,
  Tooltip
} from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'
import tableStyles from '@core/styles/table.module.css'
import { injectModels } from '../../Redux/injectModel'
import CreatePost from './createPost'
import PostDetailModal from './singlePost'
import ConfirmDelete from './confirmDelete'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const PostTableByCategory = props => {
  const [posts, setPosts] = useState([])
  const [groupedPosts, setGroupedPosts] = useState({})
  const [loading, setLoading] = useState(true)
  const [anchorElMap, setAnchorElMap] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletePostId, setDeletePostId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Pagination by category
  const [currentPage, setCurrentPage] = useState(1)
  const categoriesPerPage = 2

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
   
        if (res.data && res.data.length > 0) {
          setPosts(res.data)
        }
      } catch (err) {
        console.log('Error in fetchPosts:', err)
      } finally {
        setLoading(false)
      }
    }
   
    fetchPosts()
  
  }, [])

  // Group posts by category & filter by search
  useEffect(() => {
    
    const filtered = posts.filter(
    
      post =>
        post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post?.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post?.categories?.join(', ')?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const grouped = filtered.reduce((acc, post) => {
      
      post.categories.forEach(cat => {
      
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(post)
      })
     
      return acc
    
    }, {})

    setGroupedPosts(grouped)
    setCurrentPage(1) // reset pagination on search
  }, [searchQuery, posts])

  const categoryKeys = Object.keys(groupedPosts)
  const totalPages = Math.ceil(categoryKeys.length / categoriesPerPage)
  const indexOfLastCategory = currentPage * categoriesPerPage
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
  const currentCategories = categoryKeys.slice(indexOfFirstCategory, indexOfLastCategory)

  // Menu & actions
  const handleOpenMenu = (event, id) => setAnchorElMap(prev => ({ ...prev, [id]: event.currentTarget }))
  const handleCloseMenu = id => setAnchorElMap(prev => ({ ...prev, [id]: null }))

  const handleView = id => {
    setSelectedPostId(id)
    setIsModalOpen(true)
    handleCloseMenu(id)
  }

  const handleDelete = id => {
  
    setDeletePostId(id)
    setDeleteModalOpen(true)
  }

  const confirmDeletePost = async () => {
  
    if (!deletePostId) {
  
      showSnackbar('No post selected to delete.')
    
      return
    
    }

    setDeleteLoading(true)
   
    try {
   
      const res = await props.posts.deletePostById(deletePostId)
   
      if (res.success) setPosts(prev => prev.filter(post => post._id !== deletePostId))
      showSnackbar(res.success ? 'Post deleted successfully!' : 'Failed to delete post.')
    } catch (err) {
      console.error('Delete failed', err)
      showSnackbar('Delete failed due to server error.')
    } finally {
      setDeleteLoading(false)
      setDeleteModalOpen(false)
      setDeletePostId(null)
    }
  }

  const handleExport = async () => {
  
    try {
  
      const response = await props.posts.exportPost()
    
      if (response && response.data) {
   
        const blob = new Blob([response.data], { type: 'text/csv' })
  
        const url = window.URL.createObjectURL(blob)
  
        const link = document.createElement('a')
  
        link.href = url
        link.download = 'posts.csv'
        link.click()
        window.URL.revokeObjectURL(url)
        showSnackbar('Posts exported successfully')
      }
    } catch (err) {
      console.error('Export failed:', err)
      showSnackbar('Failed to export posts')
    }
  }

  const handleExportSinglePost = async id => {
    
    try {
    
      const response = await props.posts.exportSinglePost(id)

      if (response && response.data) {
    
        const blob = new Blob([response.data], { type: 'text/csv' }) // or 'application/pdf' if PDF
    
        const url = window.URL.createObjectURL(blob)
    
        console.log(blob, 'blog')
        console.log(url, 'url')
    
        const link = document.createElement('a')
    
        link.href = url
        link.download = `post-${id}.csv` // name the file
        link.click()
        window.URL.revokeObjectURL(url)
        showSnackbar('Post downloaded successfully')
      } else {
        showSnackbar('Failed to export post')
      }
    } catch (err) {
      console.error('Single post export failed:', err)
      showSnackbar('Failed to export post')
    }
  }

  return (
    <>
      <Card className='p-4'>
        <div className='flex flex-col sm:flex-row justify-between gap-4 mb-4'>
          <Button
            variant='outlined'
            disableElevation
            className='!border-gray-400 !text-gray-500 inline-flex items-center gap-2 rounded-md bg-white border-[1.5px] px-4 py-2 font-medium hover:bg-gray-50'
            onClick={handleExport}
          >
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
            <CreatePost />
          </div>
        </div>

        <div className='overflow-x-auto'>
          {currentCategories.length === 0 ? (
         
         <Typography className='text-center p-4'>No posts found</Typography>
         
        ) : (
        
          currentCategories.map((category, idx) => {
        
            const postsInCategory = groupedPosts[category]
         
            return (
         
         <Box key={idx} className='mb-6'>
                  <Typography variant='h6' className='mb-2'>
                    {category} ({postsInCategory.length})
                  </Typography>
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
                      {postsInCategory.map((post, i) => {
                        const image = `${NEXT_PUBLIC_APP_URL}/${post.images[0]?.replace(/\\/g, '/')}`
                        const avatarUrl = `${NEXT_PUBLIC_APP_URL}${post.user?.avatar?.replace(/\\/g, '/') || ''}`
                        const createdAt = new Date(post.createdAt).toLocaleDateString()
                        const author = post.user?.name || 'Unknown'

                        return (
                          <tr key={post._id || i}>
                            <td>
                              <img
                                src={image}
                                alt='Post'
                                width={60}
                                height={60}
                                style={{ objectFit: 'cover', borderRadius: '6px' }}
                              />
                            </td>
                            <td>
                              <Typography variant='h6'>{post.title.slice(0, 10)}...</Typography>
                              <Typography variant='body2' color='text.secondary'>
                                {post.desc.slice(0, 10)}...
                              </Typography>
                            </td>
                            <td>
                              <div className='flex items-center gap-2'>
                                <CustomAvatar src={avatarUrl} size={34} />
                                <div className='flex flex-col'>
                                  <Typography>{author}</Typography>
                                  <Typography variant='caption' color='text.secondary'>
                                    {createdAt}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td>
                              {post.categories.map((cat, i) => (
                                <Chip key={i} label={cat} size='small' className='me-1 mb-1' color='primary' />
                              ))}
                            </td>
                            <td>
                              <div className='flex gap-3 items-center'>
                                <span title='Likes'>❤️ {post.likeCount}</span>
                                <span title='Dislikes'>👎 {post.dislikeCount}</span>
                                <span title='Comments'>💬 {post.commentCount}</span>
                              </div>
                            </td>
                            <td>
                              <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
                                <Tooltip title='Delete'>
                                  <IconButton onClick={() => handleDelete(post._id)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title='View'>
                                  <IconButton onClick={() => handleView(post._id)}>
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip>
                                  <IconButton onClick={e => handleOpenMenu(e, post._id)}>
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Menu
                                    anchorEl={anchorElMap[post._id]}
                                    open={Boolean(anchorElMap[post._id])}
                                    onClose={() => handleCloseMenu(post._id)}
                                  >
                                    <MenuItem onClick={() => handleExportSinglePost(post._id)}>
                                      <ListItemText primary='Download' />
                                    </MenuItem>
                                  </Menu>
                                </Tooltip>
                              </Box>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </Box>
              )
            })
          )}
        </div>

        {/* Numbered Pagination */}

        <div className='flex justify-center mt-4'>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color='primary'
          />
        </div>
      </Card>

      <PostDetailModal open={isModalOpen} onClose={() => setIsModalOpen(false)} postId={selectedPostId} />
      <ConfirmDelete
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeletePost}
        loading={deleteLoading}
      />

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default injectModels(['posts'])(PostTableByCategory)
