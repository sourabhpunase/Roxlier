import axios from 'axios';
import ProductTransaction from '../models/transaction.js';

const initializeDatabase = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    // Insert data into MongoDB
    await ProductTransaction.insertMany(data);
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default initializeDatabase;