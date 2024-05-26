import Transaction from "../models/transaction.js";

// export const statistics=async (req,res,next)=>{

//     const { month } = req.query;

//     try {
//       let filter = {};
//       // If month parameter is provided, construct filter to match transactions for that month
//       if (month) {
//         // Extract month value from the month parameter
//         const monthValue = parseInt(month);
//         // Construct filter to match transactions for that month, regardless of the year
//         filter = {
//           $expr: {
//             $eq: [{ $month: '$dateOfSale' }, monthValue]
//           }
//         };
//       }
  
//       // Aggregate MongoDB to calculate statistics
//       const totalSales = await Transaction.aggregate([
//         { $match: filter },
//         { $group: { _id: null, totalAmount: { $sum: '$price' } } }
//       ]);
  
//       const totalSold = await Transaction.countDocuments({ ...filter, isSold: true });
//       const totalNotSold = await Transaction.countDocuments({ ...filter, isSold: false });
  
//       // Extract total amount of sales from the aggregation result
//       const totalSaleAmount = totalSales.length > 0 ? totalSales[0].totalAmount : 0;
  
//       // Send statistics as JSON response
//       res.json({
//         totalSaleAmount,
//         totalSold,
//         totalNotSold
//       });
//     } catch (error) {
//       console.error('Error fetching statistics:', error);
//       res.status(500).json({ message: 'Error fetching statistics' });
//     }
// }

export const statistics= async (req, res) => {
    try {
      const { month } = req.query;
  
      const totalSaleAmount = await Transaction.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$price' }
          }
        }
      ]);
  
      const totalSoldItems = await Transaction.countDocuments({
        $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
      });
  
      const totalNotSoldItems = await Transaction.countDocuments({
        $and: [
          { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } },
          { sold: false }
        ]
      });
  
      res.json({
        totalSaleAmount: totalSaleAmount.length ? totalSaleAmount[0].totalAmount : 0,
        totalSoldItems,
        totalNotSoldItems
      });
    } catch (error) {
      console.error('Error calculating statistics:', error);
      res.status(500).json({ message: 'Error calculating statistics' });
    }

}