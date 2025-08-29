'use client'

// React Imports
import { useState, useRef, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Snackbar, Alert } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import Chip from '@mui/material/Chip'

import moment from 'moment-timezone'

import { languageData, getCountries, getStatesByCountry, currencyList } from '@/utils/countryData'

import { injectModels } from '@/Redux/injectModel'

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

const AccountDetails = props => {
  console.log(props, 'props')

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [timeZones, setTimezones] = useState([])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    phoneNumber: '',
    address: '',
    state: '',
    zipCode: '',
    country: '',
    language: [],
    timeZone: '',
    currency: ''
  })

  const [file, setFile] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [imgSrc, setImgSrc] = useState()
  const [admin, setAdmin] = useState(null)
  const initialDataRef = useRef(null)

  useEffect(() => {
    setCountries(getCountries())
  }, [])

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const admin = await props.auth.getAdmin()

        console.log(admin, 'res from api')

        if (admin?._id) {
          setAdmin(admin)

          //       const admin = res
          // setAdminId(admin._id)
          // You can map admin fields to formData here
          const [firstName = '', lastName = ''] = admin.name?.split(' ') || []

          const initialData = {
            firstName,
            lastName,
            email: admin.email || '',
            organization: admin.organization || '',
            phoneNumber: admin.phoneNumber || '',
            address: admin.address || '',
            state: admin.state || '',
            zipCode: admin.zipCode || '',
            country: admin.country || '',
            language: admin.language || [],
            timeZone: admin.timeZone || '',
            currency: admin.currency || ''
          }

          initialDataRef.current = initialData
          setFormData(initialData)
        

          if (initialData.country) {
            setStates(getStatesByCountry(initialData.country))
            setTimezones(moment.tz.zonesForCountry(initialData.country) || [])
          }

          if (admin.avatar) {
            const avatarUrl = admin.avatar.startsWith('http')
              ? admin.avatar
              : `${BACKEND_BASE_URL}/${admin.avatar.replace(/^\/+/, '')}` // remove leading slashes

            setImgSrc(avatarUrl)
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err)
      }
    }

    fetchAdmin()
  }, [])

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileInputChange = e => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    setFile(selectedFile)
    const reader = new FileReader()

    reader.onload = () => setImgSrc(reader.result)
    reader.readAsDataURL(selectedFile)
  }

  const handleFileInputReset = () => {
    setFile(null)
    setImgSrc(admin?.avatar)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!admin?._id) {
      console.error('❌ Admin ID not found, aborting update')

      return
    }

    try {
      const id = props.auth.admin?._id || props.auth.admin?.id
      const data = new FormData()
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()

      data.append('name', fullName)
      data.append('email', formData.email)
      data.append('phoneNumber', formData.phoneNumber)
      data.append('organization', formData.organization)
      data.append('address', formData.address)
      data.append('state', formData.state)
      data.append('zipCode', formData.zipCode)
      data.append('country', formData.country)
      formData.language.forEach(lang => data.append('language', lang))
      data.append('timeZone', formData.timeZone)
      data.append('currency', formData.currency)

      if (file && file instanceof File) {
        data.append('avatar', file)
        console.log(file, 'avatra')
      } else {
        console.warn("File not uploaded because it's not a File object:", file)
      }

      await props.auth.update(id, data)

      setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' })
      console.log(data, 'profile update successfully')
    } catch (err) {
      console.error('Update failed:', err)
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' })
    }
  }

  const handleCountryChange = e => {
    const countryCode = e.target.value
   
    handleFormChange('country', countryCode)
    handleFormChange('state', '')
    handleFormChange('timeZone', '')
    setStates(getStatesByCountry(countryCode))
    setTimezones(moment.tz.zonesForCountry(countryCode) || [])
  }

  const handleStateChange = e => {
    handleFormChange('state', e.target.value)
  }

  return (
    <>
      <Card>
        <CardContent className='mbe-5'>
          <div className='flex max-sm:flex-col items-center gap-6'>
            <Avatar
              height={100}
              width={100}
              className='rounded'
              src={imgSrc}
              alt='Profile'
              onError={() => console.log('Image failed to load:', imgSrc)}
              onLoad={() => console.log('Image loaded successfully:', imgSrc)}
            />

            <div className='flex flex-grow flex-col gap-4'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button component='label' size='small' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='First Name'
                  value={formData.firstName}
                  onChange={e => handleFormChange('firstName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Last Name'
                  value={formData.lastName}
                  placeholder='Doe'
                  onChange={e => handleFormChange('lastName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Email'
                  value={formData.email}
                  placeholder='john.doe@gmail.com'
                  onChange={e => handleFormChange('email', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Organization'
                  value={formData.organization}
                  placeholder='ThemeSelection'
                  onChange={e => handleFormChange('organization', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='number'
                  label='Phone Number'
                  value={formData.phoneNumber}
                  placeholder='+1 (234) 567-8901'
                  onChange={e => handleFormChange('phoneNumber', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Address'
                  value={formData.address}
                  placeholder='Address'
                  onChange={e => handleFormChange('address', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={formData.country}
                    label='Country'
                    onChange={e => {
                      handleCountryChange(e)
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: { maxHeight: 250, overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }
                      }
                    }}
                  >
                    <MenuItem label='Country' value=''>
                      Select Country
                    </MenuItem>
                    {countries.map(c => (
                      <MenuItem key={c.isoCode} value={c.isoCode}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={!states.length}>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={formData.state}
                    label='State'
                    onChange={handleStateChange}
                    MenuProps={{
                      PaperProps: {
                        style: { maxHeight: 250, overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }
                      }
                    }}
                  >
                    <MenuItem value=''>Select State</MenuItem>
                    {states.map(s => (
                      <MenuItem key={s.isoCode} value={s.name}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='number'
                  label='Zip Code'
                  value={formData.zipCode}
                  placeholder='123456'
                  onChange={e => handleFormChange('zipCode', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    multiple
                    label='Language'
                    value={formData.language}
                    onChange={e => handleFormChange('language', e.target.value)}
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
                            onDelete={() =>
                              handleFormChange(
                                'language',
                                formData.language.filter(item => item !== value)
                              )
                            }
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
                    label='Time Zone'
                    value={formData.timeZone}
                    onChange={e => handleFormChange('timeZone', e.target.value)}
                    MenuProps={{
                      PaperProps: {
                        style: { maxHeight: 250, overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }
                      }
                    }}
                  >
                    <MenuItem value=''>Select Time Zone</MenuItem>
                    {timeZones.map(tz => (
                      <MenuItem key={tz} value={tz}>
                        {tz}
                      </MenuItem>
                    ))}
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
                    MenuProps={{
                      PaperProps: {
                        style: { maxHeight: 250, overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }
                      }
                    }}
                  >
                    {currencyList.map((currency, index) => (
                      <MenuItem key={index} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br></br>

            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Save Changes
              </Button>
              
              {/* <Button
  variant='outlined'
  type='reset'
  color='secondary'
  onClick={() => {
    if (!initialDataRef.current) return
    setFormData(initialDataRef.current)
    // setLanguage(initialDataRef.current.language || [])
    setImgSrc(admin?.avatar || '/images/avatars/1.png')
  }}
>
  Reset
</Button> */}

            </Grid>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
  )
}

export default injectModels(['auth'])(AccountDetails)
