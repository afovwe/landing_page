import { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import DashboardNavBar from '../../components/DashboardNavBar'


const Layout = () => {
  return (
    <Box width="100%" height="100%">
        
        <Box>
          <DashboardNavBar />
          <Outlet />
        </Box>
    </Box>
  )
}

export default Layout