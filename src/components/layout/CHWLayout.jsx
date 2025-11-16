// src/components/layout/CHWLayout.jsx
import React from 'react';
import MainLayout from './MainLayout';

const CHWLayout = ({ children }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

export default CHWLayout;