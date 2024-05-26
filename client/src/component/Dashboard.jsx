import React, { useEffect, useState } from 'react';
import axios from "axios";
import DataTable from "react-data-table-component";
import ProductStatsSummary from './Piechart'; 


const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("http://localhost:5000/api/transactions/transaction/");
       const res= result.json();
       console.log(res)
        setRecords(res);
        setFilteredRecords(res); // Initialize filteredRecords with all records
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  


  const handleFilter = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    if (!searchValue) {
      setFilteredRecords(records); // Reset filtered records if search value is empty
      return;
    }
    const newData = records.filter(row => {
      return (
        row.title.toLowerCase().includes(searchValue) ||
        row.description.toLowerCase().includes(searchValue) ||
        row.category.toLowerCase().includes(searchValue)
      );
    });
    setFilteredRecords(newData);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);

    if (selectedMonth === '') {
      setFilteredRecords(records); // Reset filtered records if no month is selected
      return;
    }

    const newData = records.filter(row => {
      const date = new Date(row.dateOfSale);
      const month = date.toLocaleString('en-US', { month: 'long' });
      return month.toLowerCase() === selectedMonth.toLowerCase();
    });
    setFilteredRecords(newData);
  };

  const descriptionRenderer = (row) => {
    const words = row.description.split(' ');
    const shortenedDescription = words?.slice(0, 10).join(' ');
    return <span>{shortenedDescription}...</span>;
  };

  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      width: '50px' // Custom width for ID column
    },
    {
      name: "Title",
      selector: row => row.title,
      width: '150px' // Custom width for Title column
    },
    {
      name: "Description",
      cell: row => descriptionRenderer(row)
    },
    {
      name: "Price",
      selector: row => row.price,
      width: '100px' // Custom width for Price column
    },
    {
      name: "Category",
      selector: row => row.category,
      width: '120px' // Custom width for Category column
    },
    {
      name: "Sold",
      selector: row => (row.sold ? "Yes" : "No"),
      width: '80px' // Custom width for Sold column
    },
    {
      name: "Image",
      cell: row => <img src={row.image} alt="Product" style={{ width: '50px', height: 'auto' }} />,
      width: '80px' // Custom width for Image column
    },
    {
      name: "Date",
      selector: row => row.dateOfSale,
      width: '150px' // Custom width for Date column
    }
  ];

  return (
    <div style={{ padding: "50px 10%", backgroundColor: "#F4F7ED", overflowX: "auto" }}>
      <div>
        <center>
          <h3 className='dashboard'>Transactions Dashboard</h3>
        </center>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <input type='search' placeholder='Search' onChange={handleFilter} style={{ padding: "10px", marginBottom: "8px" }} />
        </div>
        <div>
          <select value={selectedMonth} onChange={handleMonthChange} style={{ padding: "10px", marginBottom: "8px" }}>
            <option value="">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>
      {/* ProductStatsSummary component */}
           <div style={{ overflowX: "auto" }}>
        <DataTable
          columns={columns}
          data={filteredRecords}
          pagination
        />
      </div>
      <div>
      <center>
      <ProductStatsSummary filteredRecords={filteredRecords} selectedMonth={selectedMonth} />
      

      </center>
      
      </div>
    </div>
  );
};

export default Dashboard;