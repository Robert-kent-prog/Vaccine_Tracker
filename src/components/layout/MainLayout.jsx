// src/components/layout/MainLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useApp } from '../../contexts/AppContext';

const MainLayout = ({ children }) => {
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      
      <div className="flex">
        {/* Sticky Sidebar */}
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <main className={`flex-1 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;