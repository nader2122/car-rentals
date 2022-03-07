import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';
import { Row, Col, Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const BookedTable = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(false);

  const booking = async () => {
    try {
      const result = await (
        await axios.get('api/bookings/getallbookings')
      ).data;
      setBookings(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    booking();
  }, []);

  const deleteBook = async (id) => {
    try {
      setLoading(true);
      await (
        await axios.delete(`api/bookings/deletebook/${id}`)
      ).data;

      setLoading(false);
      setBookings();

      booking();
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Book deleted !',
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [mybookings, setmyBookings] = useState([]);

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
      await axios.post('/api/bookings/cancelbookings', {
        bookingid: bookingid,
        userid: user._id,
        carid: carid,
      });

      setLoading(false);

      bookById();
      booking();
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    setLoading(false);
  }

  return (
    <div className="box my-5 py-5">
      <Row style={{ justifyContent: 'center', marginBottom: '200px' }} className=" m-5 p-5">
        <Col md={12} >
          <h4 className="text-center">Bookings Table</h4>
          {loading && <Loader />}
          <Table striped bordered hover variant="dark" className="text-center" responsive="sm">
            <thead>
              <tr>
                <th>Booking Id</th>
                <th>User name</th>
                <th>Mobile</th>
                <th>Car</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>

            {bookings
              ? bookings.map((booking, _id) => {
                  return (
                    <tbody key={_id}>
                      <tr>
                        <td>{booking._id}</td>
                        <td>{booking.username}</td>
                        <td>{booking.mobile}</td>
                        <td>{booking.car}</td>
                        <td>{booking.fromdate}</td>
                        <td>{booking.todate}</td>
                        <td>
                          {booking.status === 'booked' ? (
                            <Button
                              className="btn btn-danger"
                              onClick={() =>
                                cancelBooking(booking._id, booking.carid)
                              }
                            >
                              Cancel ?
                            </Button>
                          ) : (
                            'cancelled'
                          )}
                        </td>
                        <td>
                          {booking.status === 'cancelled' ? (
                            <Button
                              className="btn btn-danger"
                              onClick={() => deleteBook(booking._id)}
                            >
                              delete
                            </Button>
                          ) : (
                            'NO'
                          )}
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : error}
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default BookedTable;
