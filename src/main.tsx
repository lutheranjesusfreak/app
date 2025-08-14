import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Navbar from './components/navbar';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import NotFoundPage from './pages/notFound';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </HashRouter>
  </StrictMode>
);
