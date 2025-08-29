"use client"

import axios from 'axios'

import { API_ENDPOINTS } from './Endpoints'
import { ResponseEnum } from './constant'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const GetDashboardSummary = async params => {
  console.log('brfore url hit1...')

  try {
    console.log('brfore url hit')
  
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.SUMMARY}`
 
    console.log('Fetching dashboard summary from:', url)
    console.log('With parameters:', params)
   
    const response = await axios.get(url, { params, withCredentials: true })

    if (response.data.success === ResponseEnum.SUCCESS) {
      console.log('✅ Dashboard summary success', response.data)
      
      return response.data
    } else {
      console.log('❌ Dashboard summary failed', response.data)
     
      return response.data
    }
  } catch (error) {
    console.error('🚨 Dashboard summary error:', error)
   
    return { success: false, message: error.message }
  }
}

export const GetTopCategories = async params => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.TOP_CATEGORIES}`
    const response = await axios.get(url, { params, withCredentials: true })

    if (response.data.success === ResponseEnum.SUCCESS || response.status === 200) {
      console.log('✅ Top categories success', response.data)
     
      return response.data
    } else {
      console.log('❌ Top categories failed', response.data)
     
      return response.data
    }
  } catch (error) {
    console.error('🚨 Top categories error:', error)

    return { success: false, message: error.message }
  }
}

// 🟩 Top Contributors
export const GetTopContributors = async params => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.TOP_CONTRIBUTORS}`
    const response = await axios.get(url, { params, withCredentials: true })

    if (response.data.success === ResponseEnum.SUCCESS || response.status === 200) {
      console.log('✅ Top contributors success', response.data)
     
      return response.data
    } else {
      console.log('❌ Top contributors failed', response.data)
     
      return response.data
    }
  } catch (error) {
    console.error('🚨 Top contributors error:', error)
   
    return { success: false, message: error.message }
  }
}


export const GetRecentUserActions = async params => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.RECENT_USER_ACTIONS}`
    const response = await axios.get(url, { params, withCredentials: true })

    if (response.data.success === ResponseEnum.SUCCESS || response.status === 200) {
      console.log('✅ Recent user actions success', response.data)
     
      return response.data
    } else {
      console.log('❌ Recent user actions failed', response.data)
    
      return response.data
    }
  } catch (error) {
    console.error('🚨 Recent user actions error:', error)
   
    return { success: false, message: error.message }
  }
}


export const GetRecentPostActions = async params => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.RECENT_POST_ACTIONS}`
    const response = await axios.get(url, { params, withCredentials: true })

    if (response.data.success === ResponseEnum.SUCCESS || response.status === 200) {
      console.log('✅ Recent posts success', response.data)
   
      return response.data
    } else {
      console.log('❌ Recent posts failed', response.data)
    
      return response.data
    }
  } catch (error) {
    console.error('🚨 Recent posts error:', error)
   
    return { success: false, message: error.message }
  }
}

export const GetUserPostCorrelation = async params => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.USER_POST_CORRELATION}`
    const response = await axios.get(url, { params, withCredentials: true })

    if (response.data.success === ResponseEnum.SUCCESS) {
      console.log('✅ User-post correlation success', response.data)
     
      return response.data
    } else {
      console.log('❌ User-post correlation failed', response.data)
     
      return response.data
    }
  } catch (error) {
    console.error('🚨 User-post correlation error:', error)
  
    return { success: false, message: error.message }
  }
}

export const GetSignupsByCountry = async params => {
  try {
    const url = `${NEXT_PUBLIC_APP_URL}${API_ENDPOINTS.SIGNUPS_BY_COUNTRY}`
    const response = await axios.get(url, { params, withCredentials: true })

    if (response.data.success === ResponseEnum.SUCCESS || response.status === 200) {
      console.log('✅ Signups by country success', response.data)
    
      return response.data
    } else {
      console.log('❌ Signups by country failed', response.data)
    
      return response.data
    }
  } catch (error) {
    console.error('🚨 Signups by country error:', error)
    
    return { success: false, message: error.message }
  }
}
