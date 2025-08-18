'use client'

import { useState,useEffect } from 'react'

import moment from 'moment-timezone';

import Modal from 'react-modal'
import {
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Box,
  Chip,
  Snackbar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

import CardContent from '@mui/material/CardContent'

import { getCountries, getStatesByCountry,languageData ,currencyList} from '@/utils/countryData';

import { injectModels } from '../../Redux/injectModel'

// Modal.setAppElement('#__next')

function CreateUser(props) {
  const [isOpen, setIsOpen] = useState(false)
   const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
const [country, setCountry] = useState('');
const [state, setState] = useState('');
  const [timezones, setTimezones] = useState([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    status:'inactive',
    organization: '',
    phoneNumber: '',
    address: '',
    state: '',
    zipCode: '',
    country: '',
    timeZone: '',
    currency: ''
  })

  const [language, setLanguage] = useState([])
  const [files, setFiles] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    setCountries(getCountries());
  }, []);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;

    setCountry(countryCode);
     setFormData(prev => ({ ...prev, country: countryCode }));
    setStates(getStatesByCountry(countryCode));
    setState(''); // reset state when country changes
     // Get all timezones for the country
    const tz = moment.tz.zonesForCountry(countryCode);

    setTimezones(tz || []);
  };

 const handleStateChange = (e) => {
  const stateName = e.target.value;

  setState(stateName);
  setFormData(prev => ({ ...prev, state: stateName })); // ✅ store in formData
};


  
  const handleFormChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLanguageChange = event => {
    const {
      target: { value }
    } = event

    setLanguage(typeof value === 'string' ? value.split(',') : value)
  }

  const handleDelete = valueToDelete => {
    setLanguage(prev => prev.filter(lang => lang !== valueToDelete))
  }

  const handleFileChange = e => {
    setFiles(Array.from(e.target.files))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const fullName = `${formData.firstName} ${formData.lastName}`.trim()

    const body = new FormData()

    body.append('name', fullName)
    body.append('email', formData.email)
    body.append('password', formData.password)
     body.append('status', formData.status)
    body.append('organization', formData.organization)
    body.append('phoneNumber', formData.phoneNumber)
    body.append('address', formData.address)
    body.append('state', formData.state)
    body.append('zipCode', formData.zipCode)
    body.append('country', formData.country)
    body.append('timeZone', formData.timeZone)
    body.append('currency', formData.currency)
    body.append('language', JSON.stringify(language))

    // ✅ Append avatar only if it exists
   if (files.length > 0) {
    body.append('avatar', files[0])  // You should send only one avatar file
  }

    const response = await props.auth.registerUser(body)

    if (response.success) {
      setSnackbar({ open: true, message: 'User created successfully!', severity: 'success' })
      setIsOpen(false)
    } else {
      setSnackbar({ open: true, message: 'Failed to create user', severity: 'error' })
    }
  }

  return (
    <>
      <Button variant='contained' onClick={() => setIsOpen(true)}>
        Create User
      </Button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1300
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
            background: 'none'
          }
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: { xs: '90vw', sm: '80vw', md: '600px' },
            maxHeight: '90vh',
          overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none', 
            position: 'relative'
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            aria-label='close'
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant='h5' mb={2}>
            Create New User
          </Typography>

          <Box component='form' onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <CardContent>
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
                      onChange={e => handleFormChange('lastName', e.target.value)}
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
                      label='Password'
                      value={formData.password}
                      onChange={e => handleFormChange('password', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        label='Status'
                        value={formData.status}
                        onChange={e => handleFormChange('status', e.target.value)}
                      >
                       <MenuItem value='inactive'>Inactive</MenuItem>
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Organization'
                      value={formData.organization}
                      onChange={e => handleFormChange('organization', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Phone Number'
                      type='number'
                      value={formData.phoneNumber}
                      onChange={e => handleFormChange('phoneNumber', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Address'
                      value={formData.address}
                      onChange={e => handleFormChange('address', e.target.value)}
                    />
                  </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth >
                      <InputLabel>Country</InputLabel>
                      <Select value={country} label="Country" onChange={handleCountryChange}  MenuProps={{ PaperProps: { style: { maxHeight: 250,overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none' } } }}>
          <MenuItem label='Country'value="">Select Country</MenuItem>
          {countries.map((c) => (
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
        <Select value={state} label="State" onChange={handleStateChange}  MenuProps={{ PaperProps: { style: { maxHeight: 250 ,overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none'} } }}>
          <MenuItem value="">Select State</MenuItem>
          {states.map((s) => (
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
                      onChange={e => handleFormChange('zipCode', e.target.value)}
                    />
                  </Grid>
              
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select
                        multiple
                        label='Language'
                        value={language}
                        onChange={handleLanguageChange}
                         MenuProps={{ PaperProps: { style: { maxHeight: 250 ,overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none'} } }}
  
                        renderValue={selected => (
                          <div className='flex flex-wrap gap-2 '>
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
                          <MenuItem value="">Select Language</MenuItem>
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
                     <Select label='Time Zone' value={formData.timeZone}
                     onChange={(e) => handleFormChange("timeZone", e.target.value)}
                     MenuProps={{ PaperProps: { style: { maxHeight: 250 ,overflowY: 'scroll', scrollbarWidth: 'none', 
                                  msOverflowStyle: 'none'} } }}>
                       <MenuItem value="">Select Time Zone</MenuItem>
          {timezones.map((tz) => (
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
      MenuProps={{ PaperProps: { style: { maxHeight: 250,overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none' } } }}
    >
      {currencyList.map((currency, index) => (
        <MenuItem key={index} value={currency}>{currency}</MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>
                </Grid>
              </CardContent>

              <Button variant='contained' component='label'>
                Upload Avatar
                <input type='file' hidden multiple accept='image/*' onChange={handleFileChange} />
              </Button>

              <Box display='flex' flexWrap='wrap' gap={1}>
                {files.map((file, index) => (
                  <Chip key={index} label={file.name} />
                ))}
              </Box>

              <Button type='submit' variant='contained' color='primary'>
                Create User
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Modal>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
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

export default injectModels(['auth'])(CreateUser)
