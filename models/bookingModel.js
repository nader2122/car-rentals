const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  car: { type: String, required: true },

  carid: { type: String, required: true },

  userid: { type: String, required: true },

  username: { type: String, required: true },

  mobile: { type: Number, required: true },

  fromdate: { type: String, required: true },

  todate: { type: String, required: true },

  totalDays: { type: Number, required: true },

  totalAmount: { type: Number, required: true },

  status: { type: String, required: true, default: 'booked' },
});

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;
