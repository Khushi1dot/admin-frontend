// eslint-disable-next-line react-hooks/exhaustive-deps
'use client'

import { useEffect, useState } from 'react'


// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

import { injectModels } from '@/Redux/injectModel'

function AccountDetails(props) {
  const [file, setFile] = useState(null)

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: ''
  })

  // Fetch user/admin data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await props.auth.getAdmin() // or getUser() in future

        if (res) {
          setFormData({
            fname: res.fname || '',
            lname: res.lname || '',
            email: res.email || '',
            mobile: res.mobile || ''
          })
          if (res.avatar) setFile(res.avatar)
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err)
      }
    }

    fetchData()
  }, [])

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileInputChange = event => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const id = props.auth.user?._id || props.auth.user?.id
      const data = new FormData()

      data.append('fname', formData.fname)
      data.append('lname', formData.lname)
      data.append('email', formData.email)
      data.append('mobile', formData.mobile)

      if (file instanceof File) {
        data.append('avatar', file)
      }

      await props.auth.update(id, data)
      alert('Profile updated successfully.')
    } catch (err) {
      console.error('Update failed:', err)
      alert('Failed to update profile.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <Typography sx={{ mb: 2 }}>Profile Picture</Typography>

                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Avatar
                    alt='Profile Image'
                    src={
                      file instanceof File
                        ? URL.createObjectURL(file)
                        : file
                        ? file
                        : '/images/default-avatar.png'
                    }
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />

                  <Button variant='contained' component='label'>
                    Upload New
                    <input
                      hidden
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={handleFileInputChange}
                      id='account-settings-upload-image'
                    />
                  </Button>
                </Box>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='First Name'
                    value={formData.fname}
                    onChange={e => handleFormChange('fname', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Last Name'
                    value={formData.lname}
                    onChange={e => handleFormChange('lname', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Email'
                    value={formData.email}
                    onChange={e => handleFormChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Mobile'
                    value={formData.mobile}
                    onChange={e => handleFormChange('mobile', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit'>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

export default injectModels(['auth'])(AccountDetails)
