import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section>
       <h1>404 The page you requested is Page not found</h1>
      <Link to="/dashboard">Back to the Dashboard</Link>
    </section>
  );
};

export default NotFound;
