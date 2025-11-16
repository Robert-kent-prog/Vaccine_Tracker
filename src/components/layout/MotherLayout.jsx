// src/components/layout/MotherLayout.jsx
import React from 'react';
import MainLayout from './MainLayout';

const MotherLayout = ({ children }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

export default MotherLayout;