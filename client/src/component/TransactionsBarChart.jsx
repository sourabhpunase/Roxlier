// import React, { useState, useEffect } from 'react';
// import { PieChart,Pie,Sector,Cell } from 'recharts';
// Chart.register(CategoryScale);
// const TransactionsBarChart = ({ selectedMonth }) => {
//   const [chartId] = useState(`transactions_bar_${selectedMonth}`); // Unique ID
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Number of Items',
//         data: [],
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//     ],
//   });

//   useEffect(() => {
//     const existingChart = Chart.getChart(chartId); // Check if chart exists
//     if (existingChart) {
//       existingChart.destroy(); // Destroy if found
//     }

//     const fetchData = async () => {
//       const url = `http://localhost:5000/api/barChart/barChart?month=${selectedMonth}`;
//       const response = await axios.get(url);
//       const labels = response.data.map((range) => range.priceRange);
//       const data = response.data.map((range) => range.itemCount);
//       setChartData({ labels, datasets: [{ label: 'Number of Items', data }] });
//     };

//     fetchData();
//   }, [selectedMonth]);

//   return (
//     <div>
//       <Bar data={chartData} id={chartId} /> {/* Specify unique ID */}
//     </div>
//   );
// };

// export default TransactionsBarChart;
import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const BarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState(null); // Assume you have a way to access the month

  useEffect(() => {
    const fetchChartData = async () => {
      if (month) { // Fetch data only if a month is available
        const data = await fetch(`http://localhost:5000/api/barChart/barChart?month=${month}`); // Call your backend function
       const res= await data.json();
        setChartData(res);
      }
    };

    fetchChartData();
  }, [month]);

  const options = {
    xaxis: {
      categories: chartData.map((item) => item.range), // Dynamic x-axis labels
    },
    yaxis: {
      title: {
        text: 'Number of Transactions',
      },
    },
    title: {
      text: month ? `Transaction Price Ranges for Month: ${month}` : 'Select a Month',
      align: 'center',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 350,
          height: 380,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          labels: {
            rotate: -45,
          },
        },
      },
    }],
  };

  return (
    <div className="bar-chart">
      <ApexCharts
        options={options}
        series={[
          {
            name: 'Number of Transactions',
            data: chartData.map((item) => item.count),
          },
        ]}
        type="bar"
        width={700} // Adjust width as needed
        height={400} // Adjust height as needed
      />
    </div>
  );
};

export default BarChart;
