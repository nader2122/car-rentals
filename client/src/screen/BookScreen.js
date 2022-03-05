import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Swal from 'sweetalert2';

import moment from 'moment';
import AOS from 'aos';
import 'aos/dist/aos.css';
// ..
AOS.init({
  duration: 3000,
});

const BookScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState();
  const [car, setCar] = useState([]);

  let { bookid } = useParams();
  let { fromdate } = useParams();
  let { todate } = useParams();

  const fromDate = moment(fromdate, 'DD-MM-YYYY');
  const toDate = moment(todate, 'DD-MM-yyyy');

  //total days
  const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

  const [totalAmount, setTotalAmount] = useState();
  const navigate = useNavigate();

  const serchCar = async () => {
    if (!localStorage.getItem('currentUser')) {
      navigate('/login');
    }
    try {
      setLoading(true);
      const book = await axios.post('/api/cars/getbyid', { bookid });
      setCar(book.data);
      setTotalAmount(book.data.rentperday * totalDays);
      setLoading(false);
    } catch (error) {
      console.log(error);
      seterror(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    serchCar();
    // eslint-disable-next-line
  }, []);

  const bookCar = async () => {
    const bookingDetails = {
      car,
      username: JSON.parse(localStorage.getItem('currentUser')).firstName,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      mobile: JSON.parse(localStorage.getItem('currentUser')).mobile,
      fromdate,
      todate,
      totalDays,
      totalAmount,
    };
    try {
      await axios.post('/api/bookings/bookcar', bookingDetails);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You Booked Successfuly',
        showConfirmButton: false,
        timer: 3000,
      });
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="m-3 pt-1">
      {loading ? (
        <Loader />
      ) : car ? (
        <div className="m-5" data-aos="fade-up">
          <Container>
            <Row className="mt-3 box">
              <Col md={7}>
                <h1>{car.name}</h1>
                <img
                  src={car.imageurls[0]}
                  alt="img-thumbnai"
                  className="carImages img-fluid"
                />
              </Col>
              <Col md={5} className="pl-2">
                <h1>Booking Details</h1>
                <hr />
                <p>
                  First Name :{' '}
                  <b style={{ fontSize: '20px' }}>
                    {' '}
                    {JSON.parse(localStorage.getItem('currentUser')).firstName}
                  </b>
                </p>
                <p>
                  User ID :{' '}
                  <b> {JSON.parse(localStorage.getItem('currentUser'))._id}</b>
                </p>
                <p>
                  Mobile :{' '}
                  <b>
                    {' '}
                    {JSON.parse(localStorage.getItem('currentUser')).mobile}
                  </b>
                </p>
                <p>
                  From Date : <b> {fromdate}</b>
                </p>
                <p>
                  To Date : <b> {todate} </b>
                </p>
                <p>
                  Max Places : <b> {car.maxplace}</b>
                </p>
                <p>
                  Model : <b> {car.model}</b>
                </p>

                <div>
                  <h1>Amount</h1>
                  <hr />
                  <p>
                    Total Days :<b> {totalDays}</b>
                  </p>
                  <p>
                    Rent Per Day :<b> {car.rentperday} DT</b>
                  </p>
                  <hr />
                  <h2>
                    Total Amount : <b> {totalAmount} DT</b>
                  </h2>
                </div>
                <div>
                  <Button
                    className="btn btn-secondary btn-lg m-5"
                    onClick={bookCar}
                  >
                    Book Now
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        error && <Error />
      )}
    </div>
  );
};

export default BookScreen;
