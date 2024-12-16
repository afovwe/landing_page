import { Footer } from './sections';
import Nav from './components/Nav.jsx';
import { Hero, PopularProducts, SuperQuality, Services, SpecialOffer, CustomerReviews, Subscribe } from './sections';
import MobileNavigation from './components/MobileNavigation';
import { Outlet, useLocation } from 'react-router-dom';

const LandingPage = () => (
  <>
    <section id="hero" className="xl:padding-1 wide:padding-r padding-b">
      <Hero />
    </section>
    <section id="popular-products" className="padding">
      <PopularProducts />
    </section>
    <section id="super-quality" className="padding">
      <SuperQuality />
    </section>
    <section id="services" className="padding-x py-10">
      <Services />
    </section>
    <section id="special-offer" className="padding">
      <SpecialOffer />
    </section>
    <section id="reviews" className="bg-pale-blue padding">
      <CustomerReviews />
    </section>
    <section id="contact-us" className="padding-x sm:py-32 py-16 w-full">
      <Subscribe />
    </section>
  </>
);

function App() {
  const location = useLocation();
  const isPublicRoute = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <main className="relative">
      <Nav />
      {isPublicRoute && <MobileNavigation />}
      
      {location.pathname === '/' ? <LandingPage /> : <Outlet />}
      
      <section className="bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </main>
  );
}

export default App;
