// src/components/layout/HospitalLayout.jsx
import React from 'react';
import MainLayout from './MainLayout';

const HospitalLayout = ({ children }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

export default HospitalLayout;