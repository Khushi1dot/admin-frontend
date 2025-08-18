'use client'

// React Imports
import { useState, useRef, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
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
import {languageData} from '@/utils/countryData';

const AccountDetails = (props)=> {
  console.log(props, 'props')


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
  timezone: '',
  currency: ''
  })

  const [file, setFile] = useState(null)
  const [imgSrc, setImgSrc] = useState() 
  const [language, setLanguage] = useState([])
 const[admin,setAdmin]=useState(null);
const initialDataRef = useRef(null)

  useEffect(() => {
    const fetchAdmin = async () => {
      try{
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
          timezone: admin.timezone || '',
          currency: admin.currency || ''
        }

          initialDataRef.current = initialData 
        setFormData(initialData)
        setLanguage(initialData.language)

       if (admin.avatar) {
  // setFile(admin.avatar)
  setImgSrc(admin.avatar)
}
 
      }
    }catch(err){
       console.error('Failed to fetch profile:', err)
    }}

    fetchAdmin()
  }, [])

  const handleDelete = value => {
    setLanguage(current => current.filter(item => item !== value))
  }

  const handleChange  = event => {
    setLanguage(event.target.value)
  }

  

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


  // const handleFileInputChange = file => {
  //   const reader = new FileReader()
  //   const { files } = file.target

  //   if (files && files.length !== 0) {
  //     reader.onload = () => setImgSrc(reader.result)
  //     reader.readAsDataURL(files[0])

  //     if (reader.result !== null) {
  //       setFileInput(reader.result)
  //     }
  //   }
  // }

  //  const handleFileInputChange = e => {
  //   const selectedFile = e.target.files?.[0]
  //   if (!selectedFile) return

  //   setFile(selectedFile)

  //   const reader = new FileReader()
  //   reader.onload = () => setImgSrc(reader.result)
  //   reader.readAsDataURL(selectedFile)
  // }

  const handleFileInputReset = () => {
    setFile(null)
    setImgSrc(admin?.avatar )
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
       data.append('language', formData.language)
       data.append('timezone', formData.timezone)
       data.append('currency', formData.currency)
  language.forEach(lang => data.append('language', lang))

      if (file && file instanceof File) {
  data.append('avatar', file);
  console.log(file,'avatra');
} else {
  console.warn("File not uploaded because it's not a File object:", file);
}


      await props.auth.update(id, data)

      // alert('Profile updated successfully.')
      console.log(data,'profile update successfully');
    } catch (err) {
      console.error('Update failed:', err)
      alert('Failed to update profile.')
    }
  }

  //  const handleSubmit = e => {
  //   e.preventDefault()

  //   const finalData = new FormData()
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (key === 'language') {
  //       language.forEach(lang => finalData.append('language', lang))
  //     } else {
  //       finalData.append(key, value)
  //     }
  //   })
  //   if (file) {
  //     finalData.append('avatar', file)
  //   }

  //   // Dispatch Redux action
  //   if (adminId) {
  //     props.auth.update(adminId, finalData)
  //   }
  // }

  // if (!formData) return <p>Loading...</p>

  return (
    <Card>
      <CardContent className='mbe-5'>
        <div className='flex max-sm:flex-col items-center gap-6'>

          <Avatar height={100} width={100} className='rounded' src={imgSrc} alt='Profile' 
           onError={() => console.log('Image failed to load:', imgSrc)}
           onLoad={() => console.log('Image loaded successfully:', imgSrc)} />

          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' size='small' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'

                  // value={file}
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

                // placeholder='John'
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
                type='Number'
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
              <TextField
                fullWidth
                label='State'
                value={formData.state}
                placeholder='New York'
                onChange={e => handleFormChange('state', e.target.value)}
              />
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
                <InputLabel>Country</InputLabel>
                <Select
                  label='Country'
                  value={formData.country}
                  onChange={e => handleFormChange('country', e.target.value)}
                >
                  <MenuItem value='germany'>India</MenuItem>
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
                  MenuProps={{ PaperProps: { style: { maxHeight: 250 ,overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none', } } }}
                >
                  <MenuItem value='gmt-12'>(GMT-12:00) International Date Line West</MenuItem>
                  <MenuItem value='gmt-11'>(GMT-11:00) Midway Island, Samoa</MenuItem>
                  <MenuItem value='gmt-10'>(GMT-10:00) Hawaii</MenuItem>
                  <MenuItem value='gmt-09'>(GMT-09:00) Alaska</MenuItem>
                  <MenuItem value='Asia/Kolkata'>(GMT+05:30) Asia Standard Time(India)</MenuItem>
                  <MenuItem value='gmt-08'>(GMT-08:00) Pacific Time (US & Canada)</MenuItem>
                  <MenuItem value='gmt-08-baja'>(GMT-08:00) Tijuana, Baja California</MenuItem>
                  <MenuItem value='gmt-07'>(GMT-07:00) Chihuahua, La Paz, Mazatlan</MenuItem>
                  <MenuItem value='gmt-07-mt'>(GMT-07:00) Mountain Time (US & Canada)</MenuItem>
                  <MenuItem value='gmt-06'>(GMT-06:00) Central America</MenuItem>
                  <MenuItem value='gmt-06-ct'>(GMT-06:00) Central Time (US & Canada)</MenuItem>
                  <MenuItem value='gmt-06-mc'>(GMT-06:00) Guadalajara, Mexico City, Monterrey</MenuItem>
                  <MenuItem value='gmt-06-sk'>(GMT-06:00) Saskatchewan</MenuItem>
                  <MenuItem value='gmt-05'>(GMT-05:00) Bogota, Lima, Quito, Rio Branco</MenuItem>
                  <MenuItem value='gmt-05-et'>(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
                  <MenuItem value='gmt-05-ind'>(GMT-05:00) Indiana (East)</MenuItem>
                  <MenuItem value='gmt-04'>(GMT-04:00) Atlantic Time (Canada)</MenuItem>
                  <MenuItem value='gmt-04-clp'>(GMT-04:00) Caracas, La Paz</MenuItem>
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
                  <MenuItem value='usd'>Ruppees</MenuItem>
                  <MenuItem value='usd'>USD</MenuItem>
                  <MenuItem value='euro'>EUR</MenuItem>
                  <MenuItem value='pound'>Pound</MenuItem>
                  <MenuItem value='bitcoin'>Bitcoin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Save Changes
              </Button>
             <Button
  variant='outlined'
  type='reset'
  color='secondary'
  onClick={() => {
    if (!initialDataRef.current) return
    setFormData(initialDataRef.current)
    setLanguage(initialDataRef.current.language || [])
    setImgSrc(admin?.avatar || '/images/avatars/1.png')
  }}
>
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
