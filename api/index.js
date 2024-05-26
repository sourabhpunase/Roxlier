import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import transactionsRouter from './routes/transactions.route.js';
import fetch from 'node-fetch';
import Static from './routes/statistics.route.js'

import Barchart from './routes/barChart.routes.js';
import PieChart from './routes/pieChart.routes.js'
import Combined from './routes/combineddata.routes.js'
import Transaction from './models/transaction.js';
const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Connect to MongoDB
mongoose.connect('mongodb+srv://sourabhpunase19:Sourabh@cluster0.vpknfgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middlewares
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// Routes
 app.use('/api/transactions', transactionsRouter);
app.use('/api/statistics',Static)
app.use('/api/barChart',Barchart)
app.use('/api/pieChart',PieChart)
app.use('/api/combineddata',Combined)
async function getPosts(){
const res=await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
const mydata=await res.json();
// console.log(mydata)
for(let i=0;i<mydata.length;i++){


 const post= new Transaction ({
    id:mydata[i]['id'],
    title:mydata[i]['title'],
    description:mydata[i]['description'],
    price:mydata[i]['price'],
    dateOfSale:mydata[i]['dateOfSale'],
    isSold:mydata[i]['sold'],
    category:mydata[i]['category'],
    image:mydata[i]['image']

  });
  await post.save();
  
}
}
getPosts();


// API to list all transactions for a specific month
// app.get('/api/transactions', async (req, res) => {
//   const { month } = req.query;
//   const startOfMonth = new Date(month);
//   const endOfMonth = new Date(startOfMonth);
//   endOfMonth.setMonth(startOfMonth.getMonth() + 1);

//   try {
//     const transactions = await Transaction.find({
//       dateOfSale: { $gte: startOfMonth, $lt: endOfMonth }
//     });
//     res.json(transactions);
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     res.status(500).json({ message: 'Error fetching transactions' });
//   }
// });



// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
