// src/components/charts/DefaultersChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DefaultersChart = () => {
  const data = [
    { month: 'Jan', defaulters: 45, followups: 35 },
    { month: 'Feb', defaulters: 52, followups: 42 },
    { month: 'Mar', defaulters: 38, followups: 30 },
    { month: 'Apr', defaulters: 61, followups: 48 },
    { month: 'May', defaulters: 55, followups: 45 },
    { month: 'Jun', defaulters: 42, followups: 38 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis label={{ value: 'Number of Cases', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="defaulters" name="Defaulters" fill="#ef4444" />
        <Bar dataKey="followups" name="Successful Follow-ups" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DefaultersChart;