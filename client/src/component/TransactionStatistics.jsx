import React from 'react';

const TransactionsStatistics = ({ totalSaleAmount, totalSoldItems, totalNotSoldItems }) => {
  return (
    <div>
      <h2>Transactions Statistics</h2>
      <p>Total Sale Amount: {totalSaleAmount}</p>
      <p>Total Sold Items: {totalSoldItems}</p>
      <p>Total Not Sold Items: {totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
