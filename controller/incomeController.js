import Income from '../models/Income.js';

// Get all income
export const getAllIncomes = async (req, res) => {
  try {
    const income = await Income.find();
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post Income
export const saveIncome = async (req, res) => {
  const income = new Income(req.body);
  try {
    const savedIncome = await income.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Income by id
export const getIncomeById = async (req, res) => {
  try {
    const id = req.params.id;
    const income = await Income.find({ _id: `${id}` });
    res.json(income);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update income
export const updateIncome = async (req, res) => {
  const cekId = await Income.findById(req.params.id);
  if (!cekId) return res.status(404).json({ message: 'Data tidak ditemukan' });
  try {
    const updatedIncome = await Income.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DeleteOne income
export const deleteIncome = async (req, res) => {
  const cekId = await Income.findById(req.params.id);
  if (!cekId) return res.status(404).json({ message: 'Data tidak ditemukan' });
  try {
    const deletedIncome = await Income.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get income by user id
export const getIncomeByUserId = async (req, res) => {
  try {
    const income = await Income.find({ id: req.params.id });
    res.json(income);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get income by user id month
export const getIncomeByUserIdByMonth = async (req, res) => {
  try {
    const filter = { id: req.params.id };
    const income = await Income.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: { date: '$date', timezone: 'Asia/Jakarta' } },
            month: { $month: { date: '$date', timezone: 'Asia/Jakarta' } },
          },
          count: {
            $sum: 1,
          },
          value: { $sum: '$value' },
          fee: { $sum: '$fee' },
        },
      },
      //   {
      //     $project: {},
      //   },
    ]).sort({ _id: { month: 1 } });
    res.json(income);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
