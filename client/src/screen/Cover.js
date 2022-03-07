import React, { useState } from 'react';
import { Button, Col, Row, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
// ..
AOS.init({
  duration: 3000,
});

const Cover = () => {
  const [show, setShow] = useState(false);
const user = JSON.parse(localStorage.getItem('currentUser'))
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row className="text-center covers">
      <Col md={11}>
        <div data-aos="fade-right">
          <h1 style={{ marginTop: '200px', color: 'white', fontSize: '65px' }}>
            WELCOME TO PRO RENTEL CAR
          </h1>
        </div>
        <h2 style={{ color: 'white' }} className="text" data-aos="fade-left">
          here you find your favorite rental cars and more...
        </h2>

        <Button
          className="btn btn-warning mt-3 btn-lg"
          data-aos="zoom-in"
          onClick={handleShow}
        >
          {user ?  <h4>Guide Users</h4> :  <h4>Let's get Started</h4>}
         
        </Button>
        {user && 
        (<Link to="/home">
          <Button
           className="btn btn-warning mt-3 btn-lg texts"
           data-aos="zoom-in"
           onClick={handleShow}
          >GO TO BOOKING</Button>
          </Link>)
                 }
                 
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          className="color-dark p-2"
        >
         
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title className="ms-auto">
              <i class="fas fa-info-circle fa-2x mx-2"> Guide The User</i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-2 m-1">
            <hr />
            <h4 className="p-1 m-1">
              <b className="px-4">
                To choose one or more cars, follow these steps:
              </b>
              <br />
              <br />
              1- Create your account (registration, fill in all the necessary
              boxes).
              <br />
              2- Go to Login.
              <br />
              3- Choose the rental date.
              <br />
              <br />
              <i class="fas fa-exclamation-triangle"></i>{' '}
              <span className="text-danger">take notice:</span>
              <br />
              If your car is not found on this date, that's mean it is reserved
              , and you must choose another date.
              <br />
              <br />
              4- Finally, click on Booked Now to confirm, and contact us
              afterwards.
              <br />
              <br />
              <i class="fas fa-exclamation-triangle"></i>{' '}
              <span className="text-danger">another note:</span>
              <br />
              You can cancel your request and choose another car if you want.
              <br />
              <br />
              Thank you for your attention and let's go{' '}
              <i className="fa fa-cars"></i>
            </h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Link to={user ? '/home' : '/login'}>
              <Button variant="dark" onClick={handleClose}>
                {user ? "GO TO BOOKING" : "GO TO LOGIN"}
                
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};

export default Cover;
