import Transaction from "../models/transaction.js";

export const transaction = async (req, res, next) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  try {
    let filter = {};

    // Construct filter based on month parameter (if provided)
    if (month) {
      try {
        // Parse month parameter to a valid Date object
        const monthDate = new Date(`2022-${month}-01`);

        // Extract month and year for filter construction
        const monthValue = monthDate.getMonth() + 1; // Months are zero-indexed (0-11)
        const yearValue = monthDate.getFullYear();

        filter = {
          $expr: {
            $and: [
              { $eq: [{ $month: '$dateOfSale' }, monthValue] },
              { $eq: [{ $year: '$dateOfSale' }, yearValue] },
            ],
          },
        };
      } catch (error) {
        console.error('Error parsing month parameter:', error);
        return res.status(400).json({ message: 'Invalid month format' });
      }
    }

    // Add search filter (if provided) with case-insensitive search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $eq: parseFloat(search) } }, // Filter by exact price match
      ];
    }

    // Execute the Mongoose queries using async/await
    const [transactions, totalTransactions] = await Promise.all([
      Transaction.find(filter).skip(skip).limit(perPage),
      Transaction.countDocuments(filter),
    ]);

    res.json({
      transactions,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / perPage),
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};
