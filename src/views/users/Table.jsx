'use client'

import { useEffect, useState } from 'react'

import {
  IconButton,
  Chip,
  Card,
  Menu,
  Typography,
  MenuItem,
  Button,
  TextField,
  ListItemIcon,
  Snackbar, Alert,
  ListItemText
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import DownloadIcon from '@mui/icons-material/Download';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import VisibilityIcon from '@mui/icons-material/Visibility';

import EditIcon from '@mui/icons-material/Edit';

import classnames from 'classnames'

import UserDetailsModal from './singleUser'

import { injectModels } from '../../Redux/injectModel'

import CustomAvatar from '@core/components/mui/Avatar'

import tableStyles from '@core/styles/table.module.css'

import CreateUser from './createUser';

import EditUserModal from './updateUser';

import ConfirmDelete from './confirmDelete';

const Table = props => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
const [selectedUserEdit, setselectedUserEdit] = useState(null);
 const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'})
  
const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackbar(prev => ({ ...prev, open: false }))
  }

const fetchUsers = async () => {
  try {
    const res = await props.auth.getAllUsers()

    if (res && res.length > 0) {
      setUsers(res)
      setFilteredUsers(res)
    } else {
      throw new Error('User list is empty or invalid')
    }
  } catch (err) {
    console.log('Error in fetchUsers:', err)
    setError('Failed to load users')
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  fetchUsers()
}, [])


const handleEdit = (userId) => {
  const userToEdit = users.find(user => user._id === userId);
  
  if (userToEdit) {
    setselectedUserEdit(userToEdit);
    setOpenEditModal(true);
  }

  handleCloseMenu();
};


   const handleDelete = (id) => {
    console.log("Deleting user:", id)
   
    setDeleteUserId(id)
    setDeleteModalOpen(true)
  }

const confirmDeleteUser = async () => {
  if (!deleteUserId) {
    showSnackbar("No user selected to delete.")

    return
  }

  setDeleteLoading(true)

  try {
    const res = await props.auth.delete(deleteUserId)

    if (res.success) {
      setUsers(prev => prev.filter(user => user._id !== deleteUserId))
      showSnackbar('User deleted successfully!')
    } else {
      showSnackbar('Failed to delete user.')
    }
  } catch (err) {
    console.error('Delete failed', err)
    showSnackbar('Delete failed due to server error.', err)
  } finally {
    setDeleteLoading(false)
    setDeleteModalOpen(false)
    setDeleteUserId(null)
  }
}



const handleViewClick = (id) => {
  setSelectedUser(id);
  setOpenUserModal(true); 
 };

  useEffect(() => {
    const filtered = users.filter(
      user =>
        user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.role?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setFilteredUsers(filtered)
  }, [searchQuery, users])

const handleDownload = async (id) => {
  try {
    const response = await props.auth.exportSingleUser(id);

console.log(response,'table user export')
showSnackbar('User download successfully')


       if (response && response.data) {
      const blob = new Blob([response.data], { type: 'text/csv' });

      console.log(blob,'table user export blob')

    const url = window.URL.createObjectURL(blob);

    console.log(url,'table export res')
    const link = document.createElement('a');

    console.log(link,'table export link');
    link.href = url;
    link.download = 'user.csv'; 
    link.click();
    window.URL.revokeObjectURL(url); 
  }  else {
      throw new Error('Invalid response');
  }
    }catch (err) {
    console.error('Export failed:', err);
    showSnackbar('Failed to export user');
  }
};
  
const handleExport = async () => {
  try {
    const response = await props.auth.exportUser(); 

console.log(response,'table users export')
showSnackbar('All users export successfully')


       if (response && response.data) {
      const blob = new Blob([response.data], { type: 'text/csv' });

      console.log(blob,'table user export blob')

    const url = window.URL.createObjectURL(blob);

    console.log(url,'table export res')
    const link = document.createElement('a');

    console.log(link,'table export link');
    link.href = url;
    link.download = 'users.csv'; 
    link.click();
    window.URL.revokeObjectURL(url); 
  }  else {
      throw new Error('Invalid response');
  }
    }catch (err) {
    console.error('Export failed:', err);
    alert('Failed to export users');
  }
};


  const handleMenuClick = (event, userId) => {
  setAnchorEl(event.currentTarget);
  setSelectedUser(userId);
};

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setSelectedUser(null)
  }

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
            label='Search User'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            size='small'
            sx={{ minWidth: '250px' }}
          />
           < CreateUser/>
        </div>
      </div>
       <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id || index}>
                <td className='!plb-1'>
                  <div className='flex items-center gap-3'>
                    <CustomAvatar src={`https://admin-backend-production-026a.up.railway.app${user.avatar}`} size={34} />
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {user.name}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className='!plb-1'>
                  <Typography>{user.email || 'N/A'}</Typography>
                </td>
                <td className='!plb-1'>
                  <div className='flex gap-2'>
                    <i className={classnames('ri-user-line', 'text-primary', 'text-[22px]')} />
                    <Typography color='text.primary'>{user.role}</Typography>
                  </div>
                </td>
                <td className='!pb-1'>
                  <Chip
                    className='capitalize'
                    variant='tonal'
                    color={user.status === 'pending' ? 'warning' : user.status === 'inactive' ? 'secondary' : 'success'}
                    label={user.status}
                    size='small'
                  />
                </td>
                <td className='!pb-1'>
                  <div className='flex gap-2 items-center'>
                    <IconButton>
                      <DeleteIcon onClick={() => handleDelete(user._id)} />
                    </IconButton>
                    <IconButton onClick={() => handleViewClick(user._id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={e => handleMenuClick(e, user._id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                    
                      <MenuItem onClick={() => handleDownload(selectedUser)}>
        <ListItemIcon>
          <DownloadIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </MenuItem>
       
        <MenuItem
  onClick={() => {
  
    handleEdit(selectedUser); 
  }}
>

        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </MenuItem> 
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

<UserDetailsModal
  open={openUserModal}
  onClose={() => setOpenUserModal(false)}
  userId={selectedUser}
  auth={props.auth}
/>

<EditUserModal
  open={openEditModal}
 onClose={() => {
    setOpenEditModal(false);
    setselectedUserEdit(null);
  }}
  user={selectedUserEdit}
  onUserUpdated={fetchUsers}
  auth={props.auth}
/>

 <ConfirmDelete
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteUser}
        loading={deleteLoading}
      />
<Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}

>
  <Alert
    onClose={handleCloseSnackbar}
    severity={snackbar.severity}
    sx={{ width: '100%' }}>
    {snackbar.message}
  </Alert>
</Snackbar>
</>
  )
}

export default injectModels(['auth'])(Table)
