import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionStatistics = () => {
    const [month, setMonth] = useState('3'); // Default month is March
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        fetchStatistics();
    }, [month]);

    const fetchStatistics = async () => {
        try {
            const response = await fetch (`http://localhost:5000/api/statistics/statistics?month=${month}`);
           const data= await response.json();

            setStatistics(data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div>
            <h2>Transaction Statistics</h2>
            <label htmlFor="monthSelect">Select Month: </label>
            <select id="monthSelect" value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <div>
                <h3>Statistics for {month}</h3>
                <p>Total Sale Amount: ${statistics.totalSaleAmount}</p>
                <p>Total Sold Items: {statistics.totalSold}</p>
                <p>Total Not Sold Items: {statistics.totalNotSold}</p>
            </div>
        </div>
    );
};

export default TransactionStatistics;
