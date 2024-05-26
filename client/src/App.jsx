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
import './App.css'
import TransactionsTable from './component/TransactionTable'; // Import your TransactionsTable component
import PieChart from './component/Piechart'; // Import your PieChart component
import BarChart from './component/TransactionsBarChart'; // Import your BarChart component
import TransactionStatistics from './component/TransactionStatistics';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [months, setMonths] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);
  const [selectedMonth, setSelectedMonth] = useState('March'); // Default to March
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSales, setTotalSales] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0); // Assuming a flag in your API response

  useEffect(() => {
    const fetchTransactions = async () => {
      const url = `http://localhost:5000/api/transactions/transaction?month=${selectedMonth}&search=${searchText}&page=${currentPage}`;
      const response = await fetch(url);
      const data=await response.json();
           setTransactions(data.transactions);
      setTotalPages(data.totalPages);

      // Fetch statistics
      const statsUrl = `http://localhost:5000/api/statistics/statistics?month=${selectedMonth}`; // Replace with your stats API endpoint
      const statsResponse = await fetch(statsUrl);
      const statsdata= await statsResponse.json();

      setTotalSales(statsdata.totalSales);
      setTotalSoldItems(statsdata.totalSoldItems);
      setTotalNotSoldItems(statsdata.totalNotSoldItems); // Assuming data structure from your API
    };

    fetchTransactions();
  }, [selectedMonth, searchText, currentPage]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1); // Reset page on month change
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ... (Pass props to PieChart and BarChart components as needed)

  return (
    <div className="transactions-page">
      <h1>Transaction Management</h1>
      <div className="controls">
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Transactions"
          className="search-input"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      <TransactionsTable
      />

      <h2>Transaction Statistics (Month: {selectedMonth})</h2>
      <TransactionStatistics/>

      <h2>Transaction Charts</h2>
      {/* Render PieChart and BarChart components here */}
   <BarChart/>

   <PieChart/>
    </div>
  );
};

export default App;
