import { headerLogo } from '../assets/images';
import { hamburger } from '../assets/icons';
import { navLinks } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../state/authSlice';

const Nav = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = !!user;

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className='padding-x py-8 absolute z-10 w-full'>
      <nav className='flex justify-between items-center max-container'>
        <a href='/'>
          <img
            src={headerLogo}
            alt='logo'
            width={129}
            height={29}
            className='m-0 w-[129px] h-[29px]'
          />
        </a>
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
          {navLinks.map((item) => (
            <li key={item.label}>
              {item.label === 'Dashboard' ? (
                <a
                  href="/dashboard"
                  onClick={handleDashboardClick}
                  className='font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red'
                >
                  {item.label}
                </a>
              ) : (
                <a
                  href={item.href}
                  className='font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red'
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className='flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className='text-slate-gray hover:text-coral-red'>Sign in</Link>
              <span>/</span>
              <Link to="/signup" className='text-slate-gray hover:text-coral-red'>Sign up</Link>
            </>
          ) : (
            <Link to="/dashboard" className='text-slate-gray hover:text-coral-red'>Dashboard</Link>
          )}
        </div>
        <div className='hidden max-lg:block'>
          <img src={hamburger} alt='hamburger icon' width={25} height={25} />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
