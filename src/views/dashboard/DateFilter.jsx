
'use client'

import { useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles'
import { GlobalStyles } from '@mui/material'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import dayjs from 'dayjs'

const DateFilterCard = ({ onFilter }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const handleFilter = () => {
    onFilter({ from, to })
  }

  useEffect(() => {
    const defaultTo = dayjs().format('YYYY-MM-DD')
    const defaultFrom = dayjs().subtract(7, 'day').format('YYYY-MM-DD')

    setFrom(defaultFrom)
    setTo(defaultTo)
    onFilter({ from: defaultFrom, to: defaultTo })
  }, [])

  return (
    <>
      <GlobalStyles
        styles={{
          'input[type="date"]::-webkit-calendar-picker-indicator': {
            filter: isDark ? 'invert(1)' : 'invert(0)',
          },
          'input[type="date"]::-moz-calendar-picker-indicator': {
            filter: isDark ? 'invert(1)' : 'invert(0)',
          },
        }}
      />

      <Card sx={{ p: 2, minWidth: 250, maxWidth: 400 }}>
        <CardContent className="flex flex-col gap-3 items-start">
          <Typography variant="h6" fontWeight={500}>
            Filter Dashboard by Date
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="From"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  sx: {
                    height: 30,
                    fontSize: '0.75rem',
                    padding: '0 8px',
                  },
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '6px 8px',
                    fontSize: '0.75rem',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '0.75rem',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="To"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  sx: {
                    height: 30,
                    fontSize: '0.75rem',
                    padding: '0 8px',
                  },
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '6px 8px',
                    fontSize: '0.75rem',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '0.75rem',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '4px',
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    minHeight: '30px',
                    textTransform: 'none',
                  }}
                  onClick={handleFilter}
                >
                  Apply
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default DateFilterCard
