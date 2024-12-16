import { useState } from 'react';
import { useGetMobileNavigationQuery, useToggleMobileNavigationMutation } from '../state/api';
import { hamburger } from '../assets/icons';

const navLinks = [
  { label: "Home", path: "hero" },
  { label: "Popular Products", path: "popular-products" },
  { label: "Super Quality", path: "super-quality" },
  { label: "Services", path: "services" },
  { label: "Special Offer", path: "special-offer" },
  { label: "Reviews", path: "reviews" },
  { label: "Contact Us", path: "contact-us" }
];

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetMobileNavigationQuery();
  const [toggleNavigation] = useToggleMobileNavigationMutation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    toggleNavigation(!isOpen);
  };

  const handleNavigation = (path) => {
    const element = document.querySelector(`#${path}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    toggleNavigation(false);
  };

  // Use local navLinks if API data is not available
  const navigationItems = data?.navigationItems || navLinks;

  return (
    <>
      <div className="md:hidden">
        <img 
          src={hamburger}
          alt="Hamburger"
          width={25}
          height={25}
          className="cursor-pointer fixed top-8 right-8 z-50"
          onClick={handleToggle}
        />

        {/* Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleToggle}
          />
        )}

        {/* Navigation Menu */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col p-8">
            <button 
              className="self-end text-2xl mb-8 text-coral-red"
              onClick={handleToggle}
            >
              ×
            </button>
            
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="py-2 text-left text-slate-gray hover:text-coral-red transition-colors font-montserrat"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation; 