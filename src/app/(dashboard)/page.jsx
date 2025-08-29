"use client"

import { useState } from 'react'

import dayjs from 'dayjs'

import Grid from '@mui/material/Grid'

import DateFilter from '@/views/dashboard/DateFilter'
import Summary from '@/views/dashboard/Summary'
import WeeklyOverview from '@views/dashboard/WeeklyOverview'
import TopCategories from '@views/dashboard/TopCategories'
import TopContributors from '@views/dashboard/TopContributors'
import PieChart from '@views/dashboard/PieChart'
import UserActions from '@views/dashboard/UserActions'
import PostActions from '@views/dashboard/PostActions'

const DashboardAnalytics = () => {
  
  const [dateParams, setDateParams] = useState({  
    from: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    to: dayjs().format('YYYY-MM-DD')})

  const handleDateFilter = (params) => {
    setDateParams(params)
  }
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <DateFilter onFilter={handleDateFilter} />
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <Summary from={dateParams.from} to={dateParams.to} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <WeeklyOverview  from={dateParams.from} to={dateParams.to} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TopCategories from={dateParams.from} to={dateParams.to}/>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <TopContributors  from={dateParams.from} to={dateParams.to}/>
          </Grid>
         
          {/* <Grid item xs={12} sm={6}>
            <CardStatVertical
              stats='862'
              trend='negative'
              trendNumber='18%'
              title='New Project'
              subtitle='Yearly Project'
              avatarColor='primary'
              avatarIcon='ri-file-word-2-line'
            />
          </Grid> */}
         
        </Grid>
      </Grid>
       <Grid item xs={12} lg={4}>
            <PieChart from={dateParams.from} to={dateParams.to} />
          </Grid>
      <Grid item xs={12} lg={8 }>
        <UserActions from={dateParams.from} to={dateParams.to}/>
      </Grid>
      <Grid item xs={12} lg={12}>
        <PostActions from={dateParams.from} to={dateParams.to}/>
      </Grid>
     
    </Grid>
  )
}

export default DashboardAnalytics
