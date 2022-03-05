import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../component/Loader';
import Error from '../component/Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import Success from '../component/Success';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [mobile, setMobile] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !mobile) {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Try a gain',
        showConfirmButton: false,
        timer: 3000,
      });
    }
    if (password !== cpassword) {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Password not confirmed',
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      const user = {
        firstName,
        lastName,
        email,
        password,
        mobile,
      };

      try {
        setLoading(true);
        const result = await axios.post('/api/users/register', user);
        setLoading(false);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'registred whith success',
          showConfirmButton: false,
          timer: 3000,
        });
        setSuccess(true);

        setEmail('');
        setFirstName('');
        setLastName('');
        setCPassword('');
        setPassword('');
        setMobile('');

        navigate('/login');
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <div className="my-5">
      <h1 className="text-center py-3 mb-5">Register Screen</h1>
      <Container>
        <Form className="w-50 m-auto">
          <Form.Group className="mb-3">
            {loading && <Loader />}

            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Fisrt Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="Put your phone number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Link
              to="/login"
              style={{ textDecoration: 'none', fontWeight: 'bold' }}
            >
              Login ?
            </Link>
          </Form.Group>
          <Button variant="dark" type="submit" onClick={Register}>
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterScreen;
