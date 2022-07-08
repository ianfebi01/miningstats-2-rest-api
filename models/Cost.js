import mongoose from 'mongoose';

const Cost = mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  detail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('cost', Cost);
