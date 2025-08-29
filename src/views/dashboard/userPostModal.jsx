'use client'

import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button
} from '@mui/material'

const UserPostDetailsModal = ({ open, handleClose, categories, userCounts, postCounts, from, to }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle>User & Post Details</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Detailed breakdown of user registrations and post creations from <b>{from}</b> to <b>{to}</b>
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell align="right"><strong>Users Registered</strong></TableCell>
              <TableCell align="right"><strong>Posts Created</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((date, index) => (
              <TableRow key={index}>
                <TableCell>{date}</TableCell>
                <TableCell align="right">{userCounts[index]}</TableCell>
                <TableCell align="right">{postCounts[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserPostDetailsModal
