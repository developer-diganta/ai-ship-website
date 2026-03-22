import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Landing } from './Landing';
import DocsPage from './DocsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="docs" element={<DocsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
