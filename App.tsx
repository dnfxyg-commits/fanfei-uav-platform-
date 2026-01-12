
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/Home';
import SolutionsView from './views/Solutions';
import SystemsView from './views/Systems';
import AboutView from './views/About';
import PartnerView from './views/Partner';
import NewsView from './views/News';

// Admin Views
import Login from './views/admin/Login';
import AdminLayout from './views/admin/AdminLayout';
import Dashboard from './views/admin/Dashboard';
import SolutionManager from './views/admin/SolutionManager';
import ProductManager from './views/admin/ProductManager';
import NewsManager from './views/admin/NewsManager';

export type ViewType = 'home' | 'solutions' | 'systems' | 'about' | 'partner' | 'news';

const PublicApp = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} />;
      case 'solutions':
        return <SolutionsView />;
      case 'systems':
        return <SystemsView />;
      case 'about':
        return <AboutView />;
      case 'partner':
        return <PartnerView />;
      case 'news':
        return <NewsView />;
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-grow pt-16 md:pt-20">
        {renderView()}
      </main>
      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="solutions" element={<SolutionManager />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="news" element={<NewsManager />} />
        </Route>

        {/* Public Routes - Catch all */}
        <Route path="/*" element={<PublicApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
