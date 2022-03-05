import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Error from '../component/Error';
import Loader from '../component/Loader';
import Success from '../component/Success';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      navigate('/');
    }
  }, []);

  const Login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Try a gain',
        showConfirmButton: false,
        timer: 3000,
      });
    }
    const user = {
      email,
      password,
    };
    try {
      setLoading(true);
      const result = await (await axios.post('/api/users/login', user)).data;
      setLoading(false);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Login whith success',
        showConfirmButton: false,
        timer: 3000,
      });
      setSuccess(true);
      localStorage.setItem('currentUser', JSON.stringify(result));
      navigate('/');
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="my-5 login">
      <h1 className="text-center py-3 mb-5">Login Screen</h1>
      <Container>
        <Form className="w-50 m-auto">
          <Form.Group className="mb-3">
            {loading && <Loader />}
            {error && <Error message="try again !" />}
            {success && <Success message="login with success" />}

            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Link
              to="/Register"
              style={{ textDecoration: 'none', fontWeight: 'bold' }}
            >
              Register ?
            </Link>
          </Form.Group>

          <Button variant="dark" type="submit" onClick={Login}>
            login
          </Button>
        </Form>
      </Container>
    </div>
  );
};
export default LoginScreen;
