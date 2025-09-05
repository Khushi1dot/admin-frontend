'use client'

// React Imports
import { useRef, useState,useEffect } from 'react'

import Link from 'next/link'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import { injectModels } from '@/Redux/injectModel'

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = (props) => {
  console.log('props', props);

  // States
  const [open, setOpen] = useState(false)
 const [admin, setAdmin] = useState(null)

  // Refs
  const anchorRef = useRef(null)

  // Hooks
  const router = useRouter()

  const handleLogout = async (e) => {
  // Close dropdown
  handleDropdownClose(e)

  // Call logout logic from redux model
  await props.auth.logout()

  // Navigate to login
  router.push('/login')
}


  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event, url) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return
    }

    setOpen(false)
  }

    // Fetch admin on mount
  useEffect(() => {
    console.log('before api')

    const fetchAdmin = async () => {
      console.log('after api')

      try {
        const res = await props.auth.getAdmin()

        console.log('Response from getAdmin:', res)

        if (res) {
          setAdmin(res)
          console.log('Admin fetched successfully:', res)
        }
      } catch (err) {
        console.error('Failed to fetch admin:', err)
      }
    }


// console.log('enddd')
    fetchAdmin()
  }, [])


  const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

const avatarSrc =
  admin?.avatar?.startsWith('http')
    ? admin.avatar
    : admin?.avatar
      ? `${BACKEND_BASE_URL}/${admin.avatar.replace(/^\/+/, '')}`
      : ''


  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt={admin?.name}
           src={avatarSrc}
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className='shadow-lg'>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
                    <Avatar alt={admin?.name} src={admin?.avatar} />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                         {admin?.name}
                      </Typography>
                      <Typography variant='caption'>{admin?.role}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                 <MenuItem
  component={Link}
  href='/account-settings'
  className='gap-3'
>
  <i className='ri-user-3-line' />
  <Typography color='text.primary'>Account Setting</Typography>
</MenuItem>

                  {/* <MenuItem className='gap-3' onClick={e => handleDropdownClose(e)}>
                    <i className='ri-settings-4-line' />
                    <Typography color='text.primary'>Settings</Typography>
                  </MenuItem>
                  <MenuItem className='gap-3' onClick={e => handleDropdownClose(e)}>
                    <i className='ri-money-dollar-circle-line' />
                    <Typography color='text.primary'>Pricing</Typography>
                  </MenuItem>
                  <MenuItem className='gap-3' onClick={e => handleDropdownClose(e)}>
                    <i className='ri-question-line' />
                    <Typography color='text.primary'>FAQ</Typography>
                  </MenuItem> */}
                  <div className='flex items-center plb-2 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-r-line' />}
                       onClick={handleLogout}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default injectModels(['auth'])(UserDropdown)
