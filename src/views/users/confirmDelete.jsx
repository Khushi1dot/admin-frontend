// ConfirmDeleteModal.jsx
'use client'

import { useState } from 'react'

import { Modal, Box, Typography, FormControlLabel, Checkbox, Button } from '@mui/material'

export default function ConfirmDeleteModal({ open, onClose, onConfirm, loading }) {
  const [confirm, setConfirm] = useState(false)

  const handleConfirm = () => {
    if (!confirm) {
      showSnackbar('Please confirm deletion.')
      
return
    }

    onConfirm()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
      sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

        //   width: '90%',
          maxWidth: 800,
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
        <Typography variant="h6">Delete User</Typography>
        <Typography variant="body2" color="text.secondary">
          Are you sure you want to delete this user? This action cannot be undone.
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={confirm}
              onChange={(e) => setConfirm(e.target.checked)}
            />
          }
          label="I confirm this user deletion"
        />

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            disabled={!confirm || loading}
            onClick={handleConfirm}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
