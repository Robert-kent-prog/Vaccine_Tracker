// src/components/charts/VaccinationTrends.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VaccinationTrends = () => {
  const data = [
    { month: 'Jan', BCG: 245, OPV: 230, Pentavalent: 210 },
    { month: 'Feb', BCG: 260, OPV: 245, Pentavalent: 225 },
    { month: 'Mar', BCG: 280, OPV: 265, Pentavalent: 240 },
    { month: 'Apr', BCG: 295, OPV: 280, Pentavalent: 255 },
    { month: 'May', BCG: 310, OPV: 295, Pentavalent: 270 },
    { month: 'Jun', BCG: 330, OPV: 310, Pentavalent: 285 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis label={{ value: 'Vaccinations', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="BCG" stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="OPV" stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="Pentavalent" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VaccinationTrends;