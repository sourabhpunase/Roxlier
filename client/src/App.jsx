// // App.js
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import TransactionsTable from './component/TransactionTable';

// import { fetchBar,fetchTrans } from './api/api';

// function App() {
//   const [transactions, setTransactions] = useState([]);
//   const [statistics, setStatistics] = useState({});
//   const [barChartData, setBarChartData] = useState([]);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       // Fetch initial data
//       const initialMonth = 'March'; // Set default month here
//       await fetchTrans(initialMonth);
//       // await fetchStat(initialMonth);
//       await fetchBar(initialMonth);
//     };

//     fetchInitialData();
//   }, []);

//   const fetchTransactions = async (month, searchTerm = '', page = 1) => {
//     try {
//       const data = await fetchTrans(month, searchTerm, page);
//       setTransactions(data);
      
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };
// console.log(transactions)
//   // const fetchStatistics = async (month) => {
//   //   try {
//   //     const data = await fetchStat(month);
//   //     setStatistics(data);
//   //   } catch (error) {
//   //     console.error('Error fetching statistics:', error);
//   //   }
//   // };
  

//   const fetchBarChartData = async (month) => {
//     try {
//       const data = await fetchBar(month);
//       setBarChartData(data);
//     } catch (error) {
//       console.error('Error fetching bar chart data:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Transactions</h1>
//       <div className="content">
//         <div className="left-panel">
//           <TransactionsTable
//             transactions={transactions}
//             fetchTransactions={fetchTransactions}
//           />
//         </div>
//         {/* <div className="right-panel">
//           <TransactionsStatistics statistics={statistics} />
//           <TransactionsBarChart barChartData={barChartData} />
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect } from 'react'

// export default function App() {
//   useEffect(()=>{

//     const fetchdata=async ()=>{
//       const res= await fetch('http://localhost:5000/api/statistics/statistics');
//       const data= await res.json();
//       console.log(data)
//     }
//   fetchdata();
  
  
//   },[])
  


//   return (
//     <div>App</div>
//   )
// }


// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './component/TransactionTable';
import TransactionsStatistics from './component/TransactionStatistics';
import  TransactionsBarChart  from './component/TransactionsBarChart';
import TransactionsPieChart from './component/Piechart';

const App = () => {
  // State variables
  const [month, setMonth] = useState('03'); // Default March
  const [transactions, setTransactions] = useState([]);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  // Fetch data from backend APIs
  const fetchData = async () => {
    try {
      // Fetch transactions for the selected month
      const transactionsResponse = await fetch(`http://localhost:5000/api/transactions/transaction?month=${month}`);
     const transdat=await transactionsResponse.json();

      setTransactions(transdat.transactions);

      // Fetch statistics for the selected month
      const statisticsResponse = await fetch(`http://localhost:5000/api/statistics/statistics?month=${month}`);
      const statdata=await statisticsResponse.json()
      setTotalSaleAmount(statdata.totalSaleAmount);
      setTotalSoldItems(statdata.totalSoldItems);
      setTotalNotSoldItems(statdata.totalNotSoldItems);

      // Fetch data for the bar chart
      const barChartResponse = await fetch(`http://localhost:5000/api/barChart/barChart?month=${month}`);
      const bardata=barChartResponse.json();

      setBarChartData(bardata);

      // Fetch data for the pie chart
      const pieChartResponse = await fetch(`http://localhost:5000/api/pieChart/piechart?month=${month}`);
      const piedata=pieChartResponse.json();

      setPieChartData(piedata);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount and when month changes
  useEffect(() => {
    fetchData();
  }, [month]);

  return (
    <div>
      {/* Month selector */}
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        {/* Add other months */}
      </select>

      {/* Transactions Table */}
      <TransactionsTable transactions={transactions} />

      {/* Transactions Statistics */}
      <TransactionsStatistics
        totalSaleAmount={totalSaleAmount}
        totalSoldItems={totalSoldItems}
        totalNotSoldItems={totalNotSoldItems}
      />

      {/* Transactions Bar Chart */}
      <TransactionsBarChart data={barChartData} />

      {/* Transactions Pie Chart */}
      <TransactionsPieChart data={pieChartData} />
    </div>
  );
};

export default App;
