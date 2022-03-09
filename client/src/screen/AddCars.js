import React, { useState } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import Loader from 'react-spinners/RiseLoader';

const AddCars = () => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [rentperday, setRentperday] = useState();
  const [model, setModel] = useState();
  const [description, setDescription] = useState();
  const [maxplace, setMaxplace] = useState();
  const [imageurl1, setImgurl1] = useState();
  const [imageurl2, setImgurl2] = useState();
  const [imageurl3, setImgurl3] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addNewCar = async () => {
    const newCar = {
      name,
      type,
      maxplace,
      rentperday,
      model,
      description,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };
    if(!name || !type || !maxplace || !rentperday || !model || !description || !imageurl1 || !imageurl2 || !imageurl3){
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Somthings Not complited!',
        showConfirmButton: false,
        timer: 3000,
      });
    }
    try {
      setLoading(true);
      await (await axios.post('api/cars/addcar',newCar)).data;
      setLoading(false);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Car Added with Success',
        showConfirmButton: false,
        timer: 3000,
      });

      setName('');
      setType('');
      setRentperday('');
      setModel('');
      setDescription('');
      setMaxplace('');
      setImgurl1('');
      setImgurl2('');
      setImgurl3('');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="box m-3 py-5">
      
      <Row className=" mx-3 py-5">
        {loading && <Loader />}
        <h1>Add Your Cars</h1>
        <Col md={5} sm={12}>
          <Form.Control
            type="text"
            placeholder="Car name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2 pb-2"
          />

          <Form.Control
            type="text"
            placeholder="Car Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mb-2 pb-2"
          />
          <Form.Control
            type="number"
            placeholder="Rent Per Day"
            value={rentperday}
            onChange={(e) => setRentperday(e.target.value)}
            className="mb-3 pb-1"
          />
          <Form.Control
            type="number"
            placeholder="Car model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mb-3 pb-2"
          />
          <Form.Control
            type="number"
            placeholder="Car max place"
            value={maxplace}
            onChange={(e) => setMaxplace(e.target.value)}
            className="mb-2 pb-2"
          />
        </Col>
        <Col md={5} sm={12}>
          <Form.Control
            type="text"
            placeholder="Car Image1"
            value={imageurl1}
            onChange={(e) => setImgurl1(e.target.value)}
            className="mb-2 pb-2"
          />
          <Form.Control
            type="text"
            placeholder="Car Image2"
            value={imageurl2}
            onChange={(e) => setImgurl2(e.target.value)}
            className="mb-2 pb-2"
            
          />
          <Form.Control
            type="text"
            placeholder="Car Image3"
            value={imageurl3}
            onChange={(e) => setImgurl3(e.target.value)}
            className="mb-2 pb-2"
          />
          <FloatingLabel label="Description">
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <Button
            type="submit"
            className="btn btn-dark m-3"
            style={{ display: 'flex', margin: 'auto' }}
            onClick={addNewCar}
          >
            Add New Car
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddCars;
