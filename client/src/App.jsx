import { Footer } from './sections';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';


const App = () => (
  <main className="relative">
    <Nav />
    <Home />
    <section className="bg-black padding-x padding-t pb-8">
      <Footer />
    </section>
  </main>
);

export default App;
