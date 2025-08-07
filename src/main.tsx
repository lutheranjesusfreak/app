import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Navbar from './components/Navbar.tsx';
import AboutPage from './pages/about.tsx';
import NotFoundPage from './pages/notFound.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <HashRouter>
      <div className="container mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </HashRouter>
  </StrictMode>
);
