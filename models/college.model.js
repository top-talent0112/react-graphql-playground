const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positiveNumber = (distance) => distance > 0;

const CollegeSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  location: {
    type: String,
    required: true,
    default: '',
  },
  rating: {
    type: Number,
    default: 0,
    validate: [positiveNumber, 'Rating should be bigger than 0'],
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('Entry', CollegeSchema);
