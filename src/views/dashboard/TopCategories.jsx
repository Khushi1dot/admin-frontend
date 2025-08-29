'use client'

import { useEffect, useState } from 'react'


import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import {
  Box,
} from "@mui/material";

import { injectModels } from '../../Redux/injectModel'

const TopCategories = (props) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPostCount, setTotalPostCount] = useState(0)

  const { from, to, dashboard } = props
  const rowsPerPage = 5

  const fetchTopCategories = async () => {
    try {
      setLoading(true)
     
      const res = await dashboard.getTopCategories({
        from,
        to,
        page,
        limit: rowsPerPage
      })
   

      if (res.success && Array.isArray(res.categories)) {
        setCategories(res.categories)
        setTotal(res.total || 0)
        setTotalPostCount(res.totalPostCount || 0)
      } else {
        setCategories([])
        setTotal(0)
        setTotalPostCount(0)
      }
    } catch (err) {
      console.error('Failed to fetch top categories', err)
      setCategories([])
      setTotal(0)
      setTotalPostCount(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
  
    setPage(1) // reset page when date changes
  
  }, [from, to])

  useEffect(() => {
  
    fetchTopCategories()
 
  }, [from, to, page])

  return (
   <Card>
      <CardHeader
        title={
         
          <Typography variant="h6" fontSize="1rem" fontWeight={500}>
            Top Categories
          </Typography>
        }
        sx={{ pb: 1 }} // ✨ Updated: Space below header to separate from content
      />

      <CardContent sx={{ pt: 1, pb: 2 }}>
        {/* ✨ Updated: Adjusted bottom spacing */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={400}>
            {totalPostCount} Posts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Across top categories
          </Typography>
        </Box>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : categories.length > 0 ? (
          <Box display="flex" flexDirection="column" gap={4}>
            {categories.map((item, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2} // ✨ Updated: Responsive spacing for small screens
              >
                {/* Left Side: Category Name */}
                <Typography fontWeight={300} color="text.primary">
                  {item.category}
                </Typography>

                {/* Right Side: Post Count + Progress Bar */}
                <Box display="flex" flexDirection="column" alignItems="flex-end">
                  <Typography variant="body2"  fontWeight={300} color="text.primary">
                    {item.count} posts
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={Math.min((item.count / (categories[0]?.count || 1)) * 100, 100)}
                    sx={{
                      width: 80, // ✨ Updated: Increased width for consistency
                      height: 6,
                      borderRadius: 4,
                      mt: 0.5 // ✨ Updated: Added spacing between text and progress bar
                    }}
                    color="primary"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>No categories found.</Typography>
        )}

        {/* ✨ Updated: Top margin added for spacing above pagination */}
        {total > rowsPerPage && (
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(total / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size="small" // ✨ Updated: Smaller pagination for visual fit
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default injectModels(['dashboard'])(TopCategories)
