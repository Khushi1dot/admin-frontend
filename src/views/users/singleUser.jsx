'use client'

import React, { useEffect, useState } from 'react'

import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Divider,
  Chip,
  Grid,
  Paper,
  IconButton,
  Collapse
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import { injectModels } from '../../Redux/injectModel'

dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)


const UserDetailsModal = ({ open, onClose, userId, auth }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [expandedPostId, setExpandedPostId] = useState(null)

  useEffect(() => {
    if (!userId || !open) return

    const fetchUser = async () => {
      setLoading(true)

      try {
        const res = await auth.getUser(userId)

        setUser(res.user)
      } catch (err) {
        console.error('Error fetching user:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId, open])

  const display = (label, value) => (
    <Typography variant="body2" gutterBottom>
      <strong>{label}:</strong> {value || 'Not provided'}
    </Typography>
  )

  const toggleExpand = (postId) => {
    setExpandedPostId(prev => (prev === postId ? null : postId))
  }

  return (
        <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 900,
          maxHeight: '90vh',
          overflowY: 'scroll', 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 3,
          outline: 'none',
          p: 4  
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : user ? (
          <>
            <Grid container spacing={4}>
              {/* Left: Avatar */}
              <Grid item xs={12} md={4} display="flex" justifyContent="center">
                <Avatar
                  alt={user.name}
                  src={`http://localhost:5000${user.avatar}`}
                  sx={{ width: 140, height: 140, borderRadius: 3 }}
                />
              </Grid>

              {/* Right: User Details */}
              <Grid item xs={12} md={8}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {user.name}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>{display('Email', user.email)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Role', user.role)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Status', user.status)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Phone Number', user.phoneNumber)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Address', user.address)}</Grid>
                  <Grid item xs={12} sm={6}>{display('State', user.state)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Zip Code', user.zipCode)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Country', user.country)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Language',
                       Array.isArray(user.language) ? user.language.join(', ') : user.language)}</Grid>
                  <Grid item xs={12} sm={6}>{display('TimeZone', user.timeZone)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Currency', user.currency)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Organization', user.organization)}</Grid>
                  <Grid item xs={12} sm={6}>{display('Joined',
            `${dayjs(user.createdAt).fromNow()} (${dayjs(user.createdAt).format('MMM DD, YYYY')})`)}</Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="caption" color="text.secondary">
                      User ID: {user._id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Posts Section */}
            <Divider sx={{ my: 4 }} />
            <Typography variant="h6" gutterBottom>
              User Posts
            </Typography>

            {user.posts && user.posts.length > 0 ? (
              <Grid container spacing={2}>
                {user.posts.map(post => (
                  <Grid item xs={12} md={6} key={post._id}>
                    <Paper elevation={5} sx={{ p: 2, borderRadius: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Title: {post.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Categories: {(post.categories && post.categories.join(', ')) || 'Uncategorized'}
                      </Typography>
                      <Typography variant="body2" mt={1}>
                        Desc: {post.desc?.slice(0, 100)}...
                      </Typography>

                      <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Chip label={`👍 ${post.likes?.length || 0}`} variant="outlined" />
                        <Chip label={`👎 ${post.dislikes?.length || 0}`} variant="outlined" />
                        <Chip label={`💬 ${post.comments?.length || 0}`} variant="outlined" />
                        <IconButton size="small" onClick={() => toggleExpand(post._id)}>
                          <ExpandMoreIcon
                            sx={{
                              transform: expandedPostId === post._id ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: '0.3s'
                            }}
                          />
                        </IconButton>
                      </Box>

                      <Collapse in={expandedPostId === post._id} timeout="auto" unmountOnExit>
                        <Box sx={{ mt: 2 }}>
                          {post.comments && post.comments.length > 0 ? (
                            post.comments.map((c, i) => (
                              <Box key={i} sx={{ borderBottom: '1px solid #eee', pb: 1, mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                  <Avatar
                                    src={`http://localhost:5000${c.userId?.avatar}`}
                                    alt={c.userId?.name}
                                    sx={{ width: 32, height: 32, mr: 1 }}
                                  />
                                  <Typography variant="subtitle2">
                                    {c.userId?.name || 'Anonymous'}
                                  </Typography>
                                </Box>
                                <Typography variant="body2">{c.text}</Typography>
                              </Box>
                            ))
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No comments yet.
                            </Typography>
                          )}
                        </Box>
                      </Collapse>

                      <Box mt={2}>
                        <Chip label={`Post ID: ${post._id}`} size="small" />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary">No posts found for this user.</Typography>
            )}
          </>
        ) : (
          <Typography color="error">User not found</Typography>
        )}
      </Box>
    </Modal>
  )
}

export default injectModels(['auth'])(UserDetailsModal)
