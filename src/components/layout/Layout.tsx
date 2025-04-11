import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import FirefliesEffect from '../effects/FirefliesEffect';

const Layout = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Helmet>
        <title>Kevin Bayter | Portfolio</title>
        <meta name="description" content="Kevin Bayter - Full Stack Developer & Physicist" />
      </Helmet>
      <Navbar />
      <FirefliesEffect count={20} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 