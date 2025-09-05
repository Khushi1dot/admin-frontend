'use client'

import { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Pagination
} from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'
import { injectModels } from '../../Redux/injectModel'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const TopContributors = ({ from, to, dashboard }) => {
  const [contributors, setContributors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const contributorsPerPage = 4

  useEffect(() => {
    const fetchTopContributors = async () => {
      try {
        const res = await dashboard.getTopContributors({ from, to })
       
        if (res.success) setContributors(res.contributors)
     
        } catch (err) {
       throw new Error(err)
      }
    }

    fetchTopContributors()

  }, [from, to])

  const totalPages = Math.ceil(contributors.length / contributorsPerPage)
  const indexOfLast = currentPage * contributorsPerPage
  const indexOfFirst = indexOfLast - contributorsPerPage
  const currentContributors = contributors.slice(indexOfFirst, indexOfLast)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent sx={{ pb: 3 }}> {/* ✨ Updated: Adjusted bottom padding for spacing consistency */}
        
        {/* ✨ Updated: Standard heading style */}
        <Typography variant="h6" fontSize="1rem" fontWeight={500} sx={{ mb: 2 }}>
          🏆 Top Contributors
        </Typography>

        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}> {/* ✨ Updated: Gap between items */}
          {currentContributors.map((user) => (
            <ListItem
              key={user.userId}
              disableGutters
              sx={{
                px: 0,
                py: 1.5, // ✨ Updated: More compact spacing
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <ListItemAvatar>
                <CustomAvatar
                  src={user.avatar ? `${NEXT_PUBLIC_APP_URL}${user.avatar}` : undefined}
                  size={35}
                />
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {/* Left: Name + Email */}
                    <Box>
                      <Typography fontWeight={500}>
                        {user.name || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email || 'N/A'}
                      </Typography>
                    </Box>

                    {/* Right: Post Count */}
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="text.secondary"
                    >
                      {user.postCount} posts
                    </Typography>
                  </Box>
                }
                sx={{ ml: 1 }}
              />
            </ListItem>
          ))}

          {contributors.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center', mt: 2 }}
            >
              No contributors found.
            </Typography>
          )}
        </List>

        {/* ✨ Updated: Increased top margin for spacing above pagination */}
        {totalPages > 1 && (
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size="small"
              color="primary"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default injectModels(['dashboard'])(TopContributors)
