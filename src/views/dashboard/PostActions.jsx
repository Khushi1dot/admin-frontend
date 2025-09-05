'use client'

import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

// MUI
import {
  Card,
  CardHeader,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Pagination,
  Avatar
} from '@mui/material'

// Icons
import VisibilityIcon from '@mui/icons-material/Visibility'

// Redux & Helpers
import { injectModels } from '../../Redux/injectModel'
import CustomAvatar from '@core/components/mui/Avatar'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const PostActivities = (props) => {
  const [activities, setActivities] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const activitiesPerPage = 4

  const { from, to, dashboard } = props

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await dashboard.getRecentPostActions({ from, to })
     
        setActivities(res.activities || [])
     
      } catch (err) {
       throw new Error('Failed to fetch recent post activities:', err)
      }
    }

    if (from && to) fetchActivities()
  
    }, [from, to])

  const indexOfLast = currentPage * activitiesPerPage
  const indexOfFirst = indexOfLast - activitiesPerPage
  const currentActivities = activities.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(activities.length / activitiesPerPage)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
<Card sx={{ p: 2 }}>
  <CardHeader
    title={
      <Typography variant="h6" fontWeight={500}>
        Post Activities
      </Typography>
    }
    sx={{ pb: 0 }}
  />

  <TableContainer>
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell sx={{ py: 1.25, whiteSpace: 'nowrap' }}>Title</TableCell>
          <TableCell sx={{ py: 1.25 }}>User</TableCell>
          <TableCell sx={{ py: 1.25 }}>Email</TableCell>
          <TableCell sx={{ py: 1.25 }} align='center'>Created At</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {currentActivities.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4}>
              <Typography
                color='text.secondary'
                align='center'
                sx={{ my: 2, fontSize: '0.85rem' }}
              >
                No recent post activities
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          currentActivities.map((post, index) => (
            <TableRow key={post._id || index}>
              <TableCell sx={{ py: 2, maxWidth: 220 }}>
                <Typography
                  fontSize="0.875rem"
                  fontWeight={500}
                  noWrap
                  title={post.title}
                >
                  {post.title || 'Untitled'}
                </Typography>
              </TableCell>

              <TableCell sx={{ py: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <CustomAvatar
                    src={
                      post.user?._id
                        ? `${NEXT_PUBLIC_APP_URL}${post.user.avatar}`
                        : undefined
                    }
                    size={40}
                  />
                  <Typography fontSize="0.875rem" fontWeight={500}>
                    {post.user?.name || 'N/A'}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell sx={{ py: 2 }}>
                <Typography variant='body2' fontSize="0.8rem">
                  {post.user?.email || 'N/A'}
                </Typography>
              </TableCell>

              <TableCell align='center' sx={{ py: 2 }}>
                <Typography variant='body2' fontSize="0.8rem" color='text.secondary'>
                  {dayjs(post.createdAt).format('DD MMM YYYY, hh:mm A')}
                </Typography>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>

  {totalPages > 1 && (
    <Box mt={3} display='flex' justifyContent='center'>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color='primary'
        size='small'
      />
    </Box>
  )}
</Card>

)
}

export default injectModels(['dashboard'])(PostActivities)
