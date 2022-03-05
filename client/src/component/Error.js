import React from 'react';
import { Alert } from 'react-bootstrap';

const Error = ({ message }) => {
  return (
    <div>
      <Alert variant="danger" className="box m-5 text-center">
        <b>{message} </b>
      </Alert>
    </div>
  );
};

export default Error;
