import { useState } from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "../../theme";

import DashboardNavBar from '../../components/DashboardNavBar'
import Sidebar from "../../components/Sidebar";
import { useGetUserQuery } from "../../state/api";

const Layout = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  //console.log("data", data);
  
  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
         user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <DashboardNavBar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
     
     
        <Outlet />
       
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default Layout;