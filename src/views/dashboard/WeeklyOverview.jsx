
'use client'

import { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'

import dayjs from 'dayjs'

// MUI
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person'

import PostAddIcon from '@mui/icons-material/PostAdd'


import { injectModels } from '../../Redux/injectModel'

import UserPostDetailsModal from './userPostModal';

import OptionsMenu from '@core/components/option-menu'

// Charts
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'), { ssr: false })

const WeeklyOverview = (props) => {
  const { from, to, dashboard } = props
  const theme = useTheme()

  const [categories, setCategories] = useState([])
  const [userCounts, setUserCounts] = useState([])
  const [postCounts, setPostCounts] = useState([])
  const [open, setOpen] = useState(false)
const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboard.getUserPostCorrelation({ from, to })
        const result = res.data || []

        setCategories(result.map(item => dayjs(item.date).format("DD MMM")))
        setUserCounts(result.map(item => item.userCount))
        setPostCounts(result.map(item => item.postCount))
      } catch (err) {
       throw new Error('Failed to fetch correlation data', err)
      }
    }

    if (from && to) fetchData()
  }, [from, to])

  const disabled = 'var(--mui-palette-text-disabled)'
  const divider = 'var(--mui-palette-divider)'

  const options = {
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: { show: false },
      parentHeightOffset: 0
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 5,
        endingShape: 'rounded'
      }
    },
    stroke: {
      width: 1,
      colors: ['transparent']
    },
    xaxis: {
      categories,
      labels: {
        rotate: -30,
        style: {
          colors: disabled,
          fontSize: '10px'
        }
      },
      axisTicks: { show: true },
      axisBorder: { show: true }
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
      labels: {
        style: {
          colors: disabled,
          fontSize: theme.typography.body2.fontSize
        }
      }
    },
    legend: {
      position: 'top',
      labels: { colors: disabled }
    },
    grid: {
      xaxis: { lines: { show: false } },
      strokeDashArray: 7,
      padding: { left: -9, top: -20, bottom: 13 },
      borderColor: divider
    },
    colors: ['#7367f0', '#b8c2cc'], // Purple for Users, Grey for Posts
    dataLabels: {
      enabled: false
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    }
  }

  return (
<Card >
  <CardHeader
    title={
      <Typography variant="h6" fontSize="1rem" fontWeight={500}>
        User vs Post Correlation
      </Typography>
    }
    
  />

  <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
    <AppReactApexCharts
      type="bar"
      height={240}
      width="100%"
      series={[
        { name: 'Users Registered', data: userCounts },
        { name: 'Posts Created', data: postCounts }
      ]}
      options={{
        ...options,
        grid: {
          ...options.grid,
          padding: { left: 10, top: -20, bottom: 13 } // ✅ Fix y-axis inside chart
        }
      }}
    />

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.customColors?.trackBg || '#f5f5f5',
        padding: '8px 12px',
        borderRadius: '8px',
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
        <Typography variant="subtitle2" fontSize="0.75rem" fontWeight={500}>
          Users joined
        </Typography>
      </Box>

      <Typography variant="body2" fontWeight={600} fontSize="0.75rem" color="text.secondary">
        vs
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <PostAddIcon sx={{ color: theme.palette.secondary.main, fontSize: 18 }} />
        <Typography variant="subtitle2" fontSize="0.75rem" fontWeight={500}>
          Posts created
        </Typography>
      </Box>
    </Box>

    {/* <Button
      variant="contained"
      fullWidth
      size="small" // ✅ Make it smaller
      sx={{ mt: 2 }}
      onClick={handleOpen}
    >
      Details
    </Button> */}
 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant='contained' size="small"  sx={{
    padding: '4px 10px',
    fontSize: '0.75rem',
    minHeight: '30px',
    textTransform: 'none' // optional: prevents all-uppercase
  }}
   onClick={handleOpen}>
            Details
          </Button>
        </div>
  </CardContent>

  <UserPostDetailsModal
    open={open}
    handleClose={handleClose}
    categories={categories}
    userCounts={userCounts}
    postCounts={postCounts}
    from={from}
    to={to}
  />
</Card>

  )
}

export default injectModels(['dashboard'])(WeeklyOverview)
