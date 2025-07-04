import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@components/pages/Home';
import Layout from '@components/layout/Layout';
import BirdBackground from '@components/BirdBackground';
import FirefliesEffect from '@components/effects/FirefliesEffect';

const App = () => {
  return (
    <Router>
      <BirdBackground />
      <FirefliesEffect />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;