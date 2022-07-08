import Cost from '../models/Cost.js';

// Get all income
export const getAllCosts = async (req, res) => {
  try {
    const cost = await Cost.find();
    res.json(cost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post Cost
export const saveCost = async (req, res) => {
  const cost = new Cost(req.body);
  try {
    const savedCost = await cost.save();
    res.status(201).json(savedCost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Cost by id
export const getCostById = async (req, res) => {
  try {
    const id = req.params.id;
    const cost = await Cost.find({ _id: `${id}` });
    res.json(cost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update Cost
export const updateCost = async (req, res) => {
  const cekId = await Cost.findById(req.params.id);
  if (!cekId) return res.status(404).json({ message: 'Data tidak ditemukan' });
  try {
    const updatedCost = await Cost.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).json(updatedCost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DeleteOne Cost
export const deleteCost = async (req, res) => {
  const cekId = await Cost.findById(req.params.id);
  if (!cekId) return res.status(404).json({ message: 'Data tidak ditemukan' });
  try {
    const deletedCost = await Cost.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedCost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Cost by user id
export const getCostByUserId = async (req, res) => {
  try {
    const cost = await Cost.find({ id: req.params.id });
    res.json(cost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get income by user id month
export const getCostByUserIdByMonth = async (req, res) => {
  try {
    const filter = { id: req.params.id };
    const cost = await Cost.aggregate([
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
          price: { $sum: '$price' },
        },
      },
      //   {
      //     $project: {},
      //   },
    ]);
    res.json(cost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
