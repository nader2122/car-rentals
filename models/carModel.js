const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  model: {
    type: Number,
    required: true,
  },

  maxplace: {
    type: Number,
    required: true,
  },

  rentperday: {
    type: Number,
    required: true,
  },

  imageurls: [],

  currentbookings: [],

  type: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },
});

const carModel = mongoose.model('carModel', carSchema);

module.exports = carModel;
