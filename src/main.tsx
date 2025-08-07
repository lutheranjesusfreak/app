import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Navbar from './components/Navbar.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="app/" element={<App />} />
        <Route path="app/:currentTab" element={<App />} />
      </Routes>
    </BrowserRouter>
);
