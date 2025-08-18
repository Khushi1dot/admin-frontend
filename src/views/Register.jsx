'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  Card, CardContent, Typography, TextField, IconButton, InputAdornment,
  Button, Divider, Snackbar, Alert
} from '@mui/material'

import { injectModels } from '../../src/Redux/injectModel'
import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'
import { useImageVariant } from '@core/hooks/useImageVariant'

const Register = ({ mode, props }) => {
  console.log(props,'props')
  const router = useRouter()

  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false
  })

  const [errors, setErrors] = useState({})
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/

  const validateField = (field, value) => {
    if (!value.trim()) return `${field} is required`

    switch (field) {
      case 'email':
        return !emailRegex.test(value) ? 'Invalid email format' : ''
      case 'password':
        return !passwordRegex.test(value)
          ? 'Min 8 chars, 1 uppercase, 1 number, 1 special char'
          : ''
      default:
        return ''
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    if (touched[field]) {
      const errorMsg = validateField(field, value)

      setErrors(prev => ({ ...prev, [field]: errorMsg }))
    }
  }

  const handleBlur = field => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const errorMsg = validateField(field, formData[field])

    setErrors(prev => ({ ...prev, [field]: errorMsg }))
  }

  const validateForm = () => {
    const newErrors = {
      username: validateField('username', formData.username),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    }

    setErrors(newErrors)
    
return Object.values(newErrors).every(msg => msg === '')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const isValid = validateForm()

    if (!isValid) return

    try {
      const res = await props.auth.registerAdmin(formData)

      if (res.success) {
        setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' })
        setTimeout(() => router.push('/login'), 1500)
      } else {
        console.log("error");
        setSnackbar({ open: true, message: res.message || 'Registration failed', severity: 'error' })
      }
    } catch (err) {
      console.error(err)
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || 'Server error',
        severity: 'error'
      })
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen relative p-6'>
      <Card className='flex flex-col sm:w-[450px]'>
        <CardContent className='p-6 sm:p-12'>
          <Link href='/' className='flex justify-center mb-6'>
            <Logo />
          </Link>
          <Typography variant='h4' className='mb-1'>Adventure starts here 🚀</Typography>
          <Typography className='mb-4'>Create your account to get started</Typography>

          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <TextField
              fullWidth label='Username'
              value={formData.username}
              onChange={e => handleChange('username', e.target.value)}
              onBlur={() => handleBlur('username')}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />

            <TextField
              fullWidth label='Email'
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              label='Password'
              type={isPasswordShown ? 'text' : 'password'}
              value={formData.password}
              onChange={e => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      size='small'
                      edge='end'
                      onClick={() => setIsPasswordShown(prev => !prev)}
                    >
                      <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button fullWidth variant='contained' type='submit'>
              Register
            </Button>

            <div className='flex justify-center gap-2 mt-2'>
              <Typography>Already have an account?</Typography>
              <Typography component={Link} href='/login' color='primary'>Login</Typography>
            </div>

            <Divider>Or</Divider>
            <div className='flex justify-center gap-2'>
              <IconButton className='text-facebook'><i className='ri-facebook-fill' /></IconButton>
              <IconButton className='text-twitter'><i className='ri-twitter-fill' /></IconButton>
              <IconButton className='text-github'><i className='ri-github-fill' /></IconButton>
              <IconButton className='text-googlePlus'><i className='ri-google-fill' /></IconButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <Illustrations maskImg={{ src: authBackground }} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant='filled'>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default injectModels(['auth'])(Register)
