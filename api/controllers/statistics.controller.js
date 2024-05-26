import Transaction from "../models/transaction.js";

export const statistics = async (req, res, next) => {
    const { month } = req.query;

    try {
        // Ensure month is a valid number between 1 and 12
        const monthValue = parseInt(month);
        if (isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
            return res.status(400).json({ message: 'Invalid month value' });
        }

        let filter = {};
        // Construct filter to match transactions for the specified month
        filter = {
            $expr: {
                $eq: [{ $month: { date: '$dateOfSale' } }, monthValue]
            }
        };

        // Aggregate MongoDB to calculate statistics
        const totalSales = await Transaction.aggregate([
            { $match: filter },
            { $group: { _id: null, totalAmount: { $sum: '$price' } } }
        ]);

        const totalSold = await Transaction.countDocuments({ ...filter, isSold: true });
        const totalNotSold = await Transaction.countDocuments({ ...filter, isSold: false });

        // Extract total amount of sales from the aggregation result
        const totalSaleAmount = totalSales.length > 0 ? totalSales[0].totalAmount : 0;

        // Send statistics as JSON response
        res.json({
            totalSaleAmount,
            totalSold,
            totalNotSold
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Error fetching statistics' });
    }
};
