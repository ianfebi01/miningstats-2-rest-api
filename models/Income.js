import mongoose from 'mongoose';

const Income = mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  value: {
    type: Number,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('incomes', Income);
