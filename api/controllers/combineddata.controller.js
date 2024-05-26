import axios from 'axios';

export const combinedData=async (req, res) => {
    const { month } = req.query;
  
    try {
      // Fetch data from each API
      const transactionsResponse = await axios.get(`/api/transactions?month=${month}`);
      const statisticsResponse = await axios.get(`/api/statistics?month=${month}`);
      const pieChartDataResponse = await axios.get(`/api/pie-chart?month=${month}`);
  
      // Extract data from responses
      const transactions = transactionsResponse.data;
      const statistics = statisticsResponse.data;
      const pieChartData = pieChartDataResponse.data;
  
      // Combine the data into a single JSON object
      const combinedData = {
        transactions,
        statistics,
        pieChartData
      };
  
      // Send the combined JSON object as the response
      res.json(combinedData);
    } catch (error) {
      console.error('Error fetching combined data:', error);
      res.status(500).json({ message: 'Error fetching combined data' });
    }
  };