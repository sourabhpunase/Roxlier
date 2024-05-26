import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const PieChart = () => {
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState('2'); // Assume you have a way to access the month

  useEffect(() => {
    const fetchChartData = async () => {
      if (month) { // Fetch data only if a month is available
        const data = await fetch(`http://localhost:5000/api/pieChart/piechart?month=${month}`); // Call your backend function
      const res=await  data.json();
      console.log(res)
        setChartData(res.map((item) => ({ name: item.category, value: item.count })));
      }
    };

    fetchChartData();
  }, [month]);

  const options = {
    title: {
      text: month ? `Transaction Categories for Month: ${month}` : 'Select a Month',
      align: 'center',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 350,
          height: 350,
        },
        legend: {
          position: 'bottom',
          offsetX: 0,
          offsetY: 0,
        },
      },
    }],
  };

  return (
    <div className="pie-chart">
      <ApexCharts
        options={options}
        series={chartData.map((item) => item.value)} // Dynamic series data with object structure
        type="pie"
        width={500} // Adjust width as needed
        height={350} // Adjust height as needed
      />
    </div>
  );
};

export default PieChart;
