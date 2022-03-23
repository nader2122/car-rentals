import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <div
      className="bg-dark text-white"
      style={{
        position: 'relative',
        bottom: '0',
        height: 'auto',
      }}
    >
      <Row>
        <Col md={4} xs={12} className="text-center">
          <h4 className="text-white">Contact us</h4>
          <br />
          <p>
            <b>Email: </b> nadertrabelssi90@gmail.com
          </p>
          <p>
            <b>Tel: </b> +216 11111111
          </p>
          <p>
            <b>address: </b> Nabeul - Tunisia
          </p>
        </Col>
        <Col md={4} xs={12} className="text-center">
          <h4 className="text-white">Social Media</h4>
          <br />
          <a href="https://www.facebook.com/" target="_blank">
            <i className="fab fa-facebook fa-3x m-2"></i>
          </a>
          <a href="https://www.twitter.com/" target="_blank">
            <i className="fab fa-twitter fa-3x m-3"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <i className="fab fa-instagram fa-3x "></i>
          </a>
        </Col>
        <Col md={4} xs={12} className="me-auto p-3">
          <b className="copyright">All Rights Reserved. © 2022</b>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
