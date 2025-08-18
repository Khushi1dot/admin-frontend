'use client';

import { useState } from 'react';

import Modal from 'react-modal';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Box,
  Chip,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { injectModels } from '../../Redux/injectModel';

// Modal.setAppElement('#__next'); // Required for accessibility

function CreatePost(props) {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    categories: '',
    name: '',
  });

  const [files, setFiles] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();

    body.append('title', formData.title);
    body.append('desc', formData.desc);
    body.append('categories', formData.categories);
    body.append('name', formData.name);
    files.forEach((file) => {
      body.append('images', file);
    });

    const response = await props.posts.createPost(body);

    if (response.success) {
      setSnackbar({ open: true, message: 'Post created successfully!', severity: 'success' });
      setIsOpen(false);
    } else {
      setSnackbar({ open: true, message: 'Failed to create post', severity: 'error' });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Create Post
      </Button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1300,
          },
          content: {
           top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            border: 'none',
            background: 'none',
          },
        }}
      >
        <Paper elevation={3}
          sx={{
            p: 4,
            width: { xs: '90vw', sm: '80vw', md: '600px' },
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative', }}>
          <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
            aria-label="close"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" mb={2}>
            Create New Post
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="desc"
                label="Description"
                multiline
                rows={4}
                value={formData.desc}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="categories"
                label="Categories (comma-separated)"
                value={formData.categories}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="name"
                label="Author (assigned user)"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
              <Button variant="contained" component="label">
                Upload Images
                <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
              </Button>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {files.map((file, index) => (
                  <Chip key={index} label={file.name} />
                ))}
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Create Post
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default injectModels(['posts'])(CreatePost);
