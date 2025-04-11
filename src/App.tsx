import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@components/pages/Home';
import Layout from '@components/layout/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App; 