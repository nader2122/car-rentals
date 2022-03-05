import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Car from '../component/Car';
import { Row, Container, Col, Form } from 'react-bootstrap';
import Loader from '../component/Loader';
import moment from 'moment';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const HomeScreen = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [repeatcar, setRepeatcar] = useState([]);
  const [searchCar, setSearchCar] = useState();
  const [type, setType] = useState('all');

  function disabledDate(current) {
    let start = moment().startOf('month');
    let end = moment().endOf('month');

    return !moment(current).isBetween(start, end);
  }

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format('DD-MM-YYYY'));
    settodate(moment(dates[1]).format('DD-MM-YYYY'));

    var temp = [];
    for (var car of repeatcar) {
      var availability = false;

      for (var booking of car.currentbookings) {
        if (car.currentbookings.length > 0) {
          if (
            !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.todate &&
              ((moment(dates[0]).format('DD-MM-YYYY') < booking.fromdate &&
                moment(dates[1]).format('DD-MM-YYYY') < booking.todate) ||
                (moment(dates[0]).format('DD-MM-YYYY') > booking.todate &&
                  moment(dates[1]).format('DD-MM-YYYY') > booking.fromdate))
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || car.currentbookings.length === 0) {
        temp.push(car);
      }
      setCars(temp);
    }
  }
  const serchCars = async () => {
    try {
      setLoading(true);
      const data = await (await axios.get('api/cars/getall')).data;

      setCars(data);
      setRepeatcar(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    serchCars();
    // eslint-disable-next-line
  }, []);

  const searchingCar = () => {
    const searching = repeatcar.filter((car) =>
      car.name.toLowerCase().includes(searchCar.toLowerCase())
    );

    setCars(searching);
  };

  const filterByType = (e) => {
    setType(e);
    if (e !== 'all') {
      const temp = repeatcar.filter(
        (car) => car.type.toLowerCase() === e.toLowerCase()
      );
      setCars(temp);
    } else {
      setCars(repeatcar);
    }
  };

  return (
    <Container style={{ marginBottom: '200px' }}>
      <Row className="justify-content-center box contains">
        <Col md={2}>
          <span>
            <h5
              className="title-date p-1 m-1 bg-secondary text-white"
              style={{
                display: 'flex',
                border: '2px solid black',
                borderRadius: '8px',
              }}
            >
              {' '}
              <i class="fas fa-calendar-day"> Select Your Car Booking Date:</i>
            </h5>
          </span>
        </Col>
        <Col md={3} sm={12} className="m-1" style={{ height: '50px' }}>
          <RangePicker
            className="RangePicker"
            format="DD-MM-YYYY"
            onChange={filterByDate}
            disabledDate={disabledDate}
            style={{ height: '50px', width: '100%' }}
          />
        </Col>

        <Col md={3} sm={12} className="m-1">
          <Form.Control
            type="text"
            placeholder="Search Car..."
            style={{ height: '50px' }}
            className="w-100"
            value={searchCar}
            onChange={(e) => {
              setSearchCar(e.target.value);
            }}
            onKeyUp={searchingCar}
          />
        </Col>
        <Col md={2} sm={12} className="m-1">
          <select
            style={{ height: '50px', border: 'none' }}
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value={'all'}>ALL</option>
            <option value={'delux'}>DELUX</option>
            <option value={'popular'}>POPULAR</option>
            <option value={'other'}>OTHER</option>
          </select>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5 p-2">
        <Col md={9}>
          {loading ? (
            <Loader />
          ) : (
            cars.map((car, _id) => {
              return (
                <div key={_id} data-aos="zoom-out-up">
                  <Car car={car} fromdate={fromdate} todate={todate} />
                </div>
              );
            })
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
