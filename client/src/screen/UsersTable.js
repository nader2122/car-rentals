import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Table } from 'react-bootstrap';
import Loader from 'react-spinners/RiseLoader';

const UsersTable = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [error, setError] = useState(false);

  const user = async () => {
    try {
      const result = await (await axios.get('api/users/getallusers')).data;
      setUsers(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    user();
  }, []);

  return (
    <div className="box my-5 py-5 ">
      <Row style={{ justifyContent: 'center' }} className=" m-5 p-5">
        <Col md={12}>
          <h4 className="text-center">Cars Table</h4>
          {loading && <Loader />}
          <Table striped bordered hover variant="dark" className="text-center" responsive="sm">
            <thead>
              <tr>
                <th>User Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Is Admin</th>
              </tr>
            </thead>

            {users &&
              users.map((user, _id) => {
                return (
                  <tbody key={_id}>
                    <tr>
                      <td>{user._id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default UsersTable;
