import React, { useState } from 'react';
import { Button, Col, Row, Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Car({ car, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="box my-3">
      <Row>
        <Col md={5}>
          <img
            src={car.imageurls[0]}
            alt="car"
            className="carImages img-fluid"
          />
        </Col>
        <Col md={7} className="p-5">
          <h1 className="headers">{car.name}</h1>
          <b>
            <p>Type : {car.type}</p>
            <p>Max Places : {car.maxplace}</p>
            <p>Model : {car.model}</p>
          </b>
          <div style={{ boxShadow: 'none', paddingTop: '20px' }}>
            <Button className="btn btn-secondary m-2" onClick={handleShow}>
              More Details
            </Button>

            {fromdate && todate && (
              <Link to={`/book/${car._id}/${fromdate}/${todate}`}>
                <Button className="btn btn-success ml">Rent Now</Button>
              </Link>
            )}
          </div>
        </Col>
      </Row>
      <div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title className="modal-name">{car.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {car.imageurls.map((image, _id) => {
                return (
                  <Carousel.Item key={_id}>
                    <img
                      className="d-block w-100 img-carousel"
                      src={image}
                      alt="car"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <hr />
            <h4 className="pt-1">Description:</h4>

            <h5 className="p-1">{car.description}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Car;
