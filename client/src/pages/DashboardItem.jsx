
import { useParams } from "react-router-dom"
const DashboardItem = () => {
    const param = useParams();
  return (
   <section>
     
      <div>Item details: {param.itemId}</div>
    </section>
  )
}

export default DashboardItem