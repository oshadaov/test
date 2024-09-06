const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;
    const userId = req.user._id;

    const newExpense = new Expense({ amount, description, date, category, userId });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
