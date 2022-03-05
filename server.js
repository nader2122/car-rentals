const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');
const carsRoute = require('./routes/carRoute');
const userRoute = require('./routes/userRoute');
const bookingRoute = require('./routes/bookingRoute');
const path = require('path');

app.use(express.json());

connectDB();

const port = process.env.PORT;

//middaleware
app.use('/api/cars', carsRoute);

app.use('/api/users', userRoute);

app.use('/api/bookings', bookingRoute);

//deploy:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, (error) => {
  error ? console.log(error) : console.log(`server is running in port ${port}`);
});
