import { NavLink, Outlet } from "react-router-dom"
import DashboardNavBar from "../components/DashboardNavBar"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "../theme";

const Dashboard = () => {
   const items = [ 1, 2, 3, 4, ]
   const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <section>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardNavBar />     
     <div className="flex gap-2">
        <div className="flex flex-col gap-4">
        {items.map((item) => (
                  <NavLink key={item} to={`/dashboard/${item}`} className={({ isActive}) => {
                    return isActive ? 'text-red-700' : ''
                  }}>
                    Item : {item}
                  </NavLink>
                
              ))} 
        </div>
        
      <Outlet />
      </div>
      </ThemeProvider>
    </section>
  )
}

export default Dashboard