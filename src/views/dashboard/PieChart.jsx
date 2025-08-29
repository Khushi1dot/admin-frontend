'use client'

import { useEffect, useState } from 'react'

import { useTheme } from '@mui/material/styles'  // Import useTheme

// MUI
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material'

// Chart
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

// Helpers
import { injectModels } from '../../Redux/injectModel'

// Import the modal component
import CountrySignupDetails from './userCountryModel'


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, fill } = payload[0].payload

    return (
      <Box
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: 3,
          p: 1.5,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 0.5 }}>
          {name}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: fill,
            }}
          />
          <Typography sx={{ fontSize: '0.8rem' }}>
            Signups: <strong>{value}</strong>
          </Typography>
        </Box>
      </Box>
    )
  }

  return null
}


const generateColor = (index, total) => {
  const hue = Math.floor((index / total) * 360)

  return `hsl(${hue}, 70%, 50%)`

}

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
}) => {
  if (percent < 0.03) return null

  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize={12}
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {value}
    </text>
  )
}

const SignupsByCountry = ({ from, to, dashboard }) => {
  const theme = useTheme() // Get current theme
  const [data, setData] = useState([])
  const [fullData, setFullData] = useState([]) // full data with users for modal
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchSignups = async () => {
      try {
        setLoading(true)
        const res = await dashboard.getSignupsByCountry({ from, to })

        if (res.success && Array.isArray(res.countries)) {
          setFullData(res.countries) // full data for modal

          const formatted = res.countries.map((item,index) => ({
            name: item.country,
            value: item.count,
            fill: generateColor(index, res.countries.length),
          }))
         
          setData(formatted)
        
        } else {
        
          setFullData([])
          setData([])
        }
      } catch (err) {
        console.error('Error fetching signups by country:', err)
        setFullData([])
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchSignups()
  }, [from, to])

  return (
    <>
      <Card sx={{ p: 2 }}>
        <CardHeader
          title={
            <Typography variant="h6" fontWeight={500}>
              Signups by Country
            </Typography>
          }
          sx={{ pb: 0 }}
        />

        <CardContent>
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress size={24} />
            </Box>
          ) : data.length === 0 ? (
            <Typography variant="body2" align="center" color="text.secondary" sx={{ my: 2 }}>
              No signup data available.
            </Typography>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={235}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    nameKey="name"
                    label={renderLabel}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    minHeight: '30px',
                    textTransform: 'none', // optional: prevents all-uppercase
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Details
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <CountrySignupDetails
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        signupData={fullData}
        from={from}
        to={to}
      />
    </>
  )
}

export default injectModels(['dashboard'])(SignupsByCountry)
