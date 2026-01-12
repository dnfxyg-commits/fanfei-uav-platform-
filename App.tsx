
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/Home';
import SolutionsView from './views/Solutions';
import SystemsView from './views/Systems';
import AboutView from './views/About';
import PartnerView from './views/Partner';
import NewsView from './views/News';

export type ViewType = 'home' | 'solutions' | 'systems' | 'about' | 'partner' | 'news';

function App() {
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
}

export default App;
