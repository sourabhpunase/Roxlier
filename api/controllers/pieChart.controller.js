import Transaction from "../models/transaction.js";

export const pieChartData=async (req,res,next)=>{

  
        try {
          const { month } = req.query;
      
          const categories = await Transaction.distinct('category', {
            $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
          });
      
          const pieChartData = [];
      
          for (const category of categories) {
            const count = await Transaction.countDocuments({
              $and: [
                { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } },
                { category }
              ]
            });
            pieChartData.push({ category, count });
          }
      
          res.json(pieChartData);
        } catch (error) {
          console.error('Error generating pie chart data:', error);
          res.status(500).json({ message: 'Error generating pie chart data' });
        }

}