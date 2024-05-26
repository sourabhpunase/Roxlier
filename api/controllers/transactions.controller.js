import Transaction from "../models/transaction.js";

export const transaction=
   
        // const { month, search = '', page = 1, perPage = 10 } = req.query;
        // const skip = (page - 1) * perPage;
      
        // try {
        //   let filter = { };
        //   // If month parameter is provided, construct filter to match transactions for that month
        //   if (month) {
        //     // Parse month parameter to a Date object
        //     const monthDate = new Date(`2022-${month}-01`);
        //     // Extract month and year from the Date object
        //     const monthValue = monthDate.getMonth() + 1;
        //     const yearValue = monthDate.getFullYear();
        //     // Construct filter to match transactions for that month, regardless of the year
        //     filter = {
        //       $expr: {
        //         $and: [
        //           { $eq: [{ $month: '$dateOfSale' }, monthValue] },
        //           { $eq: [{ $year: '$dateOfSale' }, yearValue] }
        //         ]
        //       }
        //     };
        //   }
      
        //   // If search parameter is provided, add search filter
        //   if (search) {
        //     try{
        //     filter.$or = [
        //       { title: { $regex: search, $options: 'i' } },
        //       { description: { $regex: search, $options: 'i' } },
        //       { price: parseFloat(search) }
        //     ];
        // }
        // catch(err){
        //     console.log(err);
        // }
        //   }
      
        //   // Query MongoDB using pagination and filter
        //   const transactions = await Transaction.find(filter)
        //     .skip(skip)
        //     .limit(perPage);
      
        //   // Count total number of transactions for pagination
        //   const totalTransactions = await Transaction.countDocuments(filter);
      
        //   res.json({
        //     transactions,
        //     currentPage: page,
        //     totalPages: Math.ceil(totalTransactions / perPage)
        //   });
        // } catch (error) {
        //   console.error('Error fetching transactions:', error);
        //   res.status(500).json({ message: 'Error fetching transactions' });
        // }
        async (req, res) => {
            try {
              const { month, search = '', page = 1, perPage = 10 } = req.query;
              const skip = (page - 1) * perPage;
          
              let filter = {};
              if (month) {
                // Construct filter to match transactions for the specified month
                // Assuming 'dateOfSale' field contains the transaction date
                filter = {
                  $expr: {
                    $eq: [{ $month: '$dateOfSale' }, parseInt(month)]
                  }
                };
              }
          
              if (search) {
                // Add search filter
                filter.$or = [
                  { title: { $regex: search, $options: 'i' } },
                  { description: { $regex: search, $options: 'i' } },
                  { price: parseFloat(search) }
                ];
              }
          
              const transactions = await Transaction.find(filter)
                .skip(skip)
                .limit(parseInt(perPage));
          
              const totalTransactions = await Transaction.countDocuments(filter);
          
              res.json({
                transactions,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalTransactions / parseInt(perPage))
              });
            } catch (error) {
              console.error('Error fetching transactions:', error);
              res.status(500).json({ message: 'Error fetching transactions' });
            }
        }
      
