// src/components/charts/CoverageChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CoverageChart = () => {
  const data = [
    { vaccine: 'BCG', coverage: 95, target: 90 },
    { vaccine: 'OPV', coverage: 88, target: 90 },
    { vaccine: 'Pentavalent', coverage: 82, target: 90 },
    { vaccine: 'PCV', coverage: 78, target: 90 },
    { vaccine: 'Measles', coverage: 75, target: 90 },
    { vaccine: 'Yellow Fever', coverage: 70, target: 90 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vaccine" />
        <YAxis label={{ value: 'Coverage %', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="coverage" name="Actual Coverage" fill="#3b82f6" />
        <Bar dataKey="target" name="Target Coverage" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CoverageChart;