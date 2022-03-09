import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import Error from '../../component/Error';
import Loader from '../../component/Loader';
import { Tag } from 'antd';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [mybookings, setmyBookings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const bookById = async () => {
    try {
      const data = await (
        await axios.post('/api/bookings/getuserbookings', {
          userid: JSON.parse(localStorage.getItem('currentUser'))._id,
        })
      ).data;

      setmyBookings(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    bookById();
  }, []);

  async function cancelBooking(bookingid, carid) {
    try {
      setLoading(true);
      await axios.post('/api/bookings/cancelbooking', {
        bookingid: bookingid,
        userid: user._id,
        carid: carid,
      });
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Your Booked cancelled',
        showConfirmButton: false,
        timer: 3000,
      });

      setLoading(false);

      bookById();
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    setLoading(false);
  }
  return (
    <div className="py-2 my-2 profil">
      <Row>
        <Col md={8}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
            mybookings.map((booking) => {
              return (
                <div className="box m-3 py-5">
                  <h3>{booking.car}</h3>
                  <hr />
                  <br />
                  <h5>
                    <b>Booking ID : </b> {booking._id}
                  </h5>
                  <h5>
                    <b>Rental Start Date : </b> {booking.fromdate}
                  </h5>
                  <h5>
                    <b>Rental end Date : </b> {booking.todate}
                  </h5>
                  <h5>
                    <b>Total Amount : </b> {booking.totalAmount} DT
                  </h5>
                  <h5>
                    <b>Status: </b>{' '}
                    {booking.status === 'cancelled' ? (
                      <Tag color="orange">Cancelled</Tag>
                    ) : (
                      <Tag color="green">Confirmed</Tag>
                    )}
                  </h5>
                  {booking.status !== 'cancelled' && (
                    <div style={{ float: 'right', paddingBottom:'20px' }}>
                      <Button
                        className="btn btn-danger"
                        onClick={() =>
                          cancelBooking(booking._id, booking.carid)
                        }
                      >
                        Cancel Book
                      </Button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </Col>
      </Row>
    </div>
  );
};
export default MyBookings;
