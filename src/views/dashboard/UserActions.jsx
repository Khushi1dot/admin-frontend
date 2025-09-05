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
  IconButton,
  Tooltip,
  Pagination,
  Box,
  Avatar
} from '@mui/material'

// Icons
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'
import VisibilityIcon from '@mui/icons-material/Visibility'

// Redux & Helpers
import { injectModels } from '../../Redux/injectModel'
import CustomAvatar from '@core/components/mui/Avatar'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const actionIcons = {
  updated: <EditIcon fontSize="small" color="info" />,
  deleted: <DeleteIcon fontSize="small" color="error" />,
  banned: <BlockIcon fontSize="small" color="warning" />
}

const UserActions = (props) => {
  const [actions, setActions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const actionsPerPage = 4

  const { from, to, dashboard } = props

  useEffect(() => {
    const fetchActions = async () => {
      
      try {
      
        const res = await dashboard.getRecentUserActions({ from, to })
      
        setActions(res.actions || [])
      } catch (err) {
    throw new Error('Failed to fetch recent user actions:', err)
      }
    }

   
    if (from && to) fetchActions()
  
    }, [from, to])

  const indexOfLast = currentPage * actionsPerPage
  const indexOfFirst = indexOfLast - actionsPerPage
  const currentActions = actions.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(actions.length / actionsPerPage)

  const handlePageChange = (event, value) => {
    
    setCurrentPage(value)
 
  }


  return (
    <Card sx={{ p: 1.5 }}> {/* Padding around card */}
  <CardHeader
    title={
      <Typography variant="h6" fontWeight={500}> {/* ✅ Title corrected to h6 */}
        User Activities
      </Typography>
    }
    sx={{ pb: 0 }}
  />

  <TableContainer>
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell sx={{ py: 1.5 }}>User</TableCell>
          <TableCell sx={{ py: 1.5 }}>Email</TableCell>
          <TableCell sx={{ py: 1.5 }}>Updated At</TableCell>
          <TableCell sx={{ py: 1.5 }}>Action</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {currentActions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4}>
              <Typography color='text.secondary' align='center' sx={{ my: 2 }}>
                No recent actions
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          currentActions.map((user, index) => (
            <TableRow key={user._id || index}>
              <TableCell sx={{ py: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <CustomAvatar
                    src={
                      user.avatar
                        ? `${NEXT_PUBLIC_APP_URL}${user.avatar}`
                        : undefined
                    }
                    size={35}
                  />
                  <Typography fontWeight={500} fontSize="0.875rem">
                    {user.name || 'N/A'}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell sx={{ py: 2 }}>
                <Typography variant='body2' fontSize="0.8rem">
                  {user.email || 'N/A'}
                </Typography>
              </TableCell>

              <TableCell sx={{ py: 2 }}>
                <Typography variant='body2' fontSize="0.8rem" color='text.secondary'>
                  {dayjs(user.updatedAt).format('DD MMM YYYY, hh:mm A')}
                </Typography>
              </TableCell>

              <TableCell sx={{ py: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  {actionIcons[user.action]}
                  <Typography
                    variant='body2'
                    fontSize="0.8rem"
                    fontWeight={500}
                    color={
                      user.action === 'deleted'
                        ? 'error.main'
                        : user.action === 'banned'
                        ? 'warning.main'
                        : 'info.main'
                    }
                  >
                    {user.action.charAt(0).toUpperCase() + user.action.slice(1)}
                  </Typography>
                </Box>
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

export default injectModels(['dashboard'])(UserActions)
