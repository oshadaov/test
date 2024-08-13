const Expense = require('../models/expense');

// @desc    Add a new expense
// @route   POST /api/expenses
exports.addExpense = async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;

    const newExpense = new Expense({ amount, description, date, category });
    const savedExpense = await newExpense.save();

    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all expenses
// @route   GET /api/expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
exports.updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
