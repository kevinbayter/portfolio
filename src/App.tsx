import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@components/pages/Home';
import Layout from '@components/layout/Layout';
import BirdBackground from '@components/BirdBackground';
import FirefliesBackground from '@components/effects/FirefliesBackground';

const App = () => {
  return (
    <Router>
      <BirdBackground />
      <FirefliesBackground />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;