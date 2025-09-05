"use client"

import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Components
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import {injectModels} from '../../Redux/injectModel'

// Icon class map
const iconMap = {
  users: 'ri-group-line',
  posts: 'ri-file-list-line',
  categories: 'ri-price-tag-3-line',
  comments: 'ri-message-2-line'
}

const Summary = (props) => {

  const { from, to, dashboard } = props;

  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      if (typeof dashboard.getSummary !== 'function') {
      
        return
      
      }

      const response = await dashboard.getSummary({ from, to })
  
      if (response?.success) {
  
        setSummary(response)
  
      } else {
      throw new Error('❌ Failed to fetch dashboard summary')
      }
    }

    if (from && to) {
     
      fetchSummary()
    
    }
  }, [from, to])

  const data = [
    {
      stats: summary?.totalUsers ?? 0,
      title: 'Users',
      color: 'success',
      icon: iconMap.users
    },
     {
    stats: summary?.deletedUsers ?? 0,
    title: 'Deleted Users',
    color: 'error',
    icon: iconMap.users
  },
    {
      stats: summary?.totalPosts ?? 0,
      title: 'Posts',
      color: 'primary',
      icon: iconMap.posts
    },
    {
      stats: summary?.totalCategories ?? 0,
      title: 'Categories',
      color: 'warning',
      icon: iconMap.categories
    },
    
    // {
    //   stats: summary?.totalComments ?? 0,
    //   title: 'Comments',
    //   color: 'info',
    //   icon: iconMap.comments
    // }
  ]

  return (
<Card sx={{ p: 2, width: '100%', maxWidth: '100%' }}>
  <CardHeader
    title={
      <Typography variant="h6" fontSize="1rem" fontWeight={500} sx={{ mb: 1 }}>
        Dashboard Summary
      </Typography>
    }
    subheader={
      <Typography variant="body2" sx={{ mt: 1 }}>
        <span className='font-medium text-textPrimary'>Live overview</span>
        <span className='text-textSecondary'> (All-time stats)</span>
      </Typography>
    }
    sx={{ pb: 1 }}
  />

  <CardContent sx={{ pt: 0, pb: 2 }}>
    <Grid container spacing={1}>
      {data.map((item, index) => (
        <Grid item xs={6} md={3} key={index}>
          <div className='flex items-center gap-2'>
            <CustomAvatar
              variant='rounded'
              color={item.color}
              className='shadow-xs'
              sx={{ width: 32, height: 32, fontSize: '1rem' }}
            >
              <i className={item.icon}></i>
            </CustomAvatar>

            <div>
              <Typography sx={{ fontSize: '0.8rem' }}>{item.title}</Typography>
              <Typography variant='h6' sx={{ fontSize: '1rem', fontWeight: 500 }}>
                {item.stats}
              </Typography>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  </CardContent>
</Card>

  )
}

export default injectModels(['dashboard'])(Summary)
