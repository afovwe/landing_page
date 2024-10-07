
import { useParams } from "react-router-dom"
const Profile = () => {
  const param = useParams();
  
  return (
   <section>
     
      <div>Profile details: {param.profileId}</div>
    </section>
  )
}

export default Profile