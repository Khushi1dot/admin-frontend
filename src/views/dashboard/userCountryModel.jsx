'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import dayjs from 'dayjs'

import CustomAvatar from '@core/components/mui/Avatar'



const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Same color generator function as in your chart component

const generateColor = (index, total) => {
  const hue = Math.floor((index / total) * 360)

  return `hsl(${hue}, 70%, 50%)`
}

const CountrySignupDetails = ({ open, handleClose, signupData, from, to }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle>Signup Details by Country</DialogTitle>

      <DialogContent
        dividers
        sx={{
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Full list of users who signed up between <b>{from}</b> and <b>{to}</b>
        </Typography>

        {signupData.map((country, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {/* Color box next to country name */}
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: generateColor(index, signupData.length),
                  borderRadius: '50%',
                  display: 'inline-block',
                  mr: 1.5,
                  border: '1px solid rgba(0,0,0,0.2)' // optional border for contrast
                }}
              />
              <Typography>
                {country.country} — {country.count} signups
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List dense>
                {country.users?.map((user, idx) => (
                  <ListItem key={idx}>
                    <ListItemAvatar>
                      <CustomAvatar src={user.avatar ? `${NEXT_PUBLIC_APP_URL}${user.avatar}` : undefined} size={35} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ ml: 2, minWidth: 160, textAlign: 'right' }}
                    >
                      {dayjs(user.createdAt).format('MMM D, YYYY, h:mm A')}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} sx={{ mt: 5 }} variant='outlined'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CountrySignupDetails
