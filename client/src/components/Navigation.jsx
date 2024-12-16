import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../state/authSlice';

const Navigation = () => {
  const user = useSelector(selectCurrentUser);

  const userLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/products', label: 'Products' },
  ];

  const adminLinks = [
    ...userLinks,
    { to: '/overview', label: 'Overview' },
    { to: '/daily', label: 'Daily' },
    { to: '/monthly', label: 'Monthly' },
    { to: '/customers', label: 'Customers' },
    { to: '/add-product', label: 'Add Product' },
    { to: '/add-user', label: 'Add User' },
  ];

  const superadminLinks = [
    ...adminLinks,
    { to: '/admin-management', label: 'Admin Management' },
    { to: '/system-settings', label: 'System Settings' },
  ];

  let links = [];
  switch (user?.role) {
    case 'superadmin':
      links = superadminLinks;
      break;
    case 'admin':
      links = adminLinks;
      break;
    case 'user':
      links = userLinks;
      break;
    default:
      links = [];
  }

  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
