// api/index.js

export const fetchTrans = async (month, searchTerm = '', page = 1) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/transaction?month=${month}&search=${searchTerm}&page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching transactions:', error);
    }
  };
  
//   export const fetchStat = async (month) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/statistics/statistics?month=${month}`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw new Error('Error fetching statistics:', error);
//     }
//   };
  
  export const fetchBar = async (month) => {
    try {
      const response = await fetch(`http://localhost:5000/api/barChart/barchart?month=${month}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching bar chart data:', error);
    }
  };
  