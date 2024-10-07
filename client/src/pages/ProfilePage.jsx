import { NavLink, Outlet } from "react-router-dom"
import DashboardNavBar from "../components/DashboardNavBar"


const ProfilePage = () => {
  const profiles = [ 1, 2, 3, 4, ]
  return (
      <>
      <DashboardNavBar />
      <div className="flex gap-2">
        <div className="flex flex-col gap-4">
        {profiles.map((profile) => (
                  <NavLink key={profile} to={`/profile/${profile}`} className={({ isActive}) => {
                    return isActive ? 'text-red-700' : ''
                  }}>
                    Profile : {profile}
                  </NavLink>
                
              ))} 
        </div>
        
      <Outlet />
      </div>
     
    </>
    
  )
}

export default ProfilePage