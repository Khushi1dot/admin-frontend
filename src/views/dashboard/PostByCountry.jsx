'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { injectModels } from '../../Redux/injectModel'
import CustomAvatar from '@core/components/mui/Avatar'

const PostsByCountry = (props) => {
  const [countries, setCountries] = useState([])
const { from, to, dashboard } = props
  
useEffect(() => {
   
    const fetchData = async () => {
  
      try {
  
        const res = await dashboard.getPostsByCountry({from,to}) // 🔁 update if route differs
    
  
       setCountries(Array.isArray(res) ? res : []);
  
      } catch (error) {
        console.error('Failed to fetch post country data:', error)
      }
    }

    fetchData()
  }, [from,to])

  return (
    <Card>
      <CardHeader
        title='Posts by Country'
       />
      <CardContent className='flex flex-col gap-[0.875rem]'>
        {countries.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <CustomAvatar skin='light' color='primary'>
              {item.country?.slice(0, 2).toUpperCase()}
            </CustomAvatar>
            <div className='flex items-center justify-between is-full flex-wrap gap-x-4 gap-y-2'>
              <div className='flex flex-col gap-1'>
                <Typography color='text.primary' className='font-medium'>
                  {item.count} posts
                </Typography>
                <Typography>{item.country}</Typography>
              </div>
              <div className='flex flex-col gap-1'>
                <Typography color='text.primary' className='font-medium'>
                  {/* Optionally show % if you calculate total */}
                  —
                </Typography>
                <Typography variant='body2' color='text.disabled'>
                  {/* Replace or remove label */}
                  Total
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default injectModels(['dashboard'])(PostsByCountry)
