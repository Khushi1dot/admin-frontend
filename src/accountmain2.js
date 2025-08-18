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
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'

import { injectModels } from '@/Redux/injectModel'

const languageData = ['English', 'Arabic', 'French', 'German', 'Portuguese']

const AccountDetails = ({ auth }) => {
  const [formData, setFormData] = useState(null)
  const [fileInput, setFileInput] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [language, setLanguage] = useState([])

  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await auth.getAdmin()

      if (res?._id) {
        const admin = res

        // You can map admin fields to formData here
        const initialData = {
          firstName: admin.firstName || '',
          lastName: admin.lastName || '',
          email: admin.email || '',
          organization: admin.organization || '',
          phoneNumber: admin.phoneNumber || '',
          address: admin.address || '',
          state: admin.state || '',
          zipCode: admin.zipCode || '',
          country: admin.country || '',
          language: admin.language || [],
          timezone: admin.timezone || '',
          currency: admin.currency || ''
        }

        setFormData(initialData)
        setLanguage(initialData.language)
      }
    }

    fetchAdmin()
  }, [auth])

  const handleDelete = value => {
    setLanguage(current => current.filter(item => item !== value))
  }

  const handleChange = event => {
    setLanguage(event.target.value)
  }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileInputChange = file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  if (!formData) return <p>Loading...</p>

  return (
    <Card>
      <CardContent className='mbe-5'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' size='small' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button size='small' variant='outlined' color='error' onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>

      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='First Name' value={formData.firstName} onChange={e => handleFormChange('firstName', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Last Name' value={formData.lastName} onChange={e => handleFormChange('lastName', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Email' value={formData.email} onChange={e => handleFormChange('email', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Organization' value={formData.organization} onChange={e => handleFormChange('organization', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Phone Number' value={formData.phoneNumber} onChange={e => handleFormChange('phoneNumber', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Address' value={formData.address} onChange={e => handleFormChange('address', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='State' value={formData.state} onChange={e => handleFormChange('state', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='number' label='Zip Code' value={formData.zipCode} onChange={e => handleFormChange('zipCode', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select label='Country' value={formData.country} onChange={e => handleFormChange('country', e.target.value)}>
                  <MenuItem value='usa'>USA</MenuItem>
                  <MenuItem value='uk'>UK</MenuItem>
                  <MenuItem value='australia'>Australia</MenuItem>
                  <MenuItem value='germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  multiple
                  label='Language'
                  value={language}
                  onChange={handleChange}
                  renderValue={selected => (
                    <div className='flex flex-wrap gap-2'>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          clickable
                          deleteIcon={
                            <i className='ri-close-circle-fill' onMouseDown={event => event.stopPropagation()} />
                          }
                          size='small'
                          label={value}
                          onDelete={() => handleDelete(value)}
                        />
                      ))}
                    </div>
                  )}
                >
                  {languageData.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>TimeZone</InputLabel>
                <Select
                  label='TimeZone'
                  value={formData.timezone}
                  onChange={e => handleFormChange('timezone', e.target.value)}
                  MenuProps={{ PaperProps: { style: { maxHeight: 250 } } }}
                >
                  <MenuItem value='gmt-12'>(GMT-12:00) International Date Line West</MenuItem>
                  <MenuItem value='gmt-11'>(GMT-11:00) Midway Island, Samoa</MenuItem>
                  <MenuItem value='gmt-10'>(GMT-10:00) Hawaii</MenuItem>
                  {/* Add more zones as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  label='Currency'
                  value={formData.currency}
                  onChange={e => handleFormChange('currency', e.target.value)}
                >
                  <MenuItem value='usd'>USD</MenuItem>
                  <MenuItem value='euro'>EUR</MenuItem>
                  <MenuItem value='pound'>Pound</MenuItem>
                  <MenuItem value='bitcoin'>Bitcoin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>Save Changes</Button>
              <Button variant='outlined' type='reset' color='secondary' onClick={() => setFormData(formData)}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default injectModels(['auth'])(AccountDetails)
