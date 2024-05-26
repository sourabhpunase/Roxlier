import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TransactionsPieChart = ({ data }) => {
  return (
    <div>
      <h2>Transactions Pie Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsPieChart;
