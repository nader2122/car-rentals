const express = require('express');
const res = require('express/lib/response');
const bookingModel = require('../models/bookingModel');
const router = express.Router();
const carModel = require('../models/carModel');

//get all cars
router.get('/getall', async (req, res) => {
  try {
    const cars = await carModel.find({});
    res.send(cars);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

//get by id:
router.post('/getbyid', async (req, res) => {
  const bookid = req.body.bookid;
  try {
    const book = await carModel.findOne({ _id: bookid });
    res.send(book);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// add new car route:

router.post('/addcar', async (req, res) => {
  try {
    const newcar = new carModel(req.body);

    await newcar.save();
    res.status(200).send('new car added successfuly');
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE : REMOVE A car BY ID
router.delete('/deletecar/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const del = await carModel.findByIdAndDelete({ _id: id });
    res.send(del);
  } catch (err) {
    console.log(error);
  }
});

module.exports = router;
