import { Link } from "react-router-dom"
import DashboardNavBar from "../components/DashboardNavBar"


const NotFound = () => {
  return (
     <section>
      <DashboardNavBar />
      <h1>404 Page not found </h1>
      <Link to="/">Back to home</Link>
    </section>
  )
}

export default NotFound