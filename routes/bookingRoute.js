const express = require('express');
const Car = require('../models/carModel');
const router = express.Router();
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

router.post('/bookcar', async (req, res) => {
  const {
    car,
    userid,
    username,
    mobile,
    fromdate,
    todate,
    totalDays,
    totalAmount,
  } = req.body;
  try {
    const newBooking = new Booking({
      car: car.name,
      carid: car._id,
      userid: userid,
      username: username,
      mobile: mobile,
      fromdate: fromdate,
      todate: todate,
      totalAmount,
      totalDays,
    });
    const booking = await newBooking.save();

    const carTemp = await Car.findOne({ _id: car._id });

    carTemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      username: username,
      mobile: mobile,
      status: booking.status,
    });
    await carTemp.save();
    return res.status(200).send('car booked with success');
  } catch (error) {
    console.log(error);
    return res.status(400).json('errors');
  }
});

router.post('/getuserbookings', async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/cancelbooking', async (req, res) => {
  const { bookingid, carid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });

    bookingitem.status = 'cancelled';

    await bookingitem.save();

    const car = await Car.findOne({ _id: carid });

    const bookings = car.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );

    car.currentbookings = temp;
    await car.save();

    res.send('Booking cancelled successfully');
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'something went wrong' });
  }
});

router.get('/getallbookings', async (req, res) => {
  try {
    const result = await Booking.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/deletebook/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Booking.findByIdAndDelete({ _id: id });
    res.send('book deleted');
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/cancelbookings', async (req, res) => {
  const { bookingid, carid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });

    bookingitem.status = 'cancelled';

    await bookingitem.save();

    const car = await Car.findOne({ _id: carid });

    const bookings = car.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );

    car.currentbookings = temp;
    await car.save();

    res.send('Booking cancelled successfully');
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'something went wrong' });
  }
});

module.exports = router;
