'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  Card, CardContent, Typography, TextField, IconButton, InputAdornment,
  Checkbox, Button, FormControlLabel, Divider, Snackbar, Alert
} from '@mui/material'

import { injectModels } from '../../src/Redux/injectModel'

// MUI Imports

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const Login = (props) => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false
  })

  const [errors, setErrors] = useState({})
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'
  const authBackground = useImageVariant( lightImg, darkImg)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/

  const validateField = (field, value) => {
    if (!value.trim()) return `${field} is required`
    if (field === 'email' && !emailRegex.test(value)) return 'Invalid email format'
    if (field === 'password' && !passwordRegex.test(value))
      return 'Min 8 chars, 1 uppercase, 1 number, 1 special char'
    
return ''
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    if (touched[field]) {
      const error = validateField(field, value)

      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = field => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field])

    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const validateForm = () => {
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    }

    setErrors(newErrors)
    
return Object.values(newErrors).every(x => x === '')
  }

 const handleSubmit = async e => {
    e.preventDefault()
    const isValid = validateForm()

    if (!isValid) return

    try {
      const res = await props.auth.loginAdmin(formData)

      if (res && res.success) {
        setSnackbar({ open: true, message: res.message || 'Login successful!', severity: 'success' })
        setTimeout(() => router.push('/'), 1500)
      } else {
        setSnackbar({ open: true, message: res?.message || 'Login failed', severity: 'error' })
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || 'Server error',
        severity: 'error'
      })
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
              <Typography className='mbs-1'>Please sign in to your account and start the adventure</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <TextField
                autoFocus
                fullWidth
                label='Email'
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
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} required label='Remember me' />
                <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Log In
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} href='/register' color='primary'>
                  Create an account
                </Typography>
              </div>
              <Divider className='gap-3'>or</Divider>
              <div className='flex justify-center items-center gap-2'>
                <IconButton size='small' className='text-facebook'>
                  <i className='ri-facebook-fill' />
                </IconButton>
                <IconButton size='small' className='text-twitter'>
                  <i className='ri-twitter-fill' />
                </IconButton>
                <IconButton size='small' className='text-github'>
                  <i className='ri-github-fill' />
                </IconButton>
                <IconButton size='small' className='text-googlePlus'>
                  <i className='ri-google-fill' />
                </IconButton>
              </div>
            </form>
          </div>
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

export default injectModels(['auth'])(Login)