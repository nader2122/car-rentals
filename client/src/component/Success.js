import React from 'react';
import { Alert } from 'react-bootstrap';
const Success = ({ message }) => {
  return (
    <Alert variant="success" className="box m-5 text-center">
      <b>{message}</b>
    </Alert>
  );
};

export default Success;
