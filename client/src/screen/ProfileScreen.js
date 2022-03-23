import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';
import MyBookings from './profil-items/MyBookings';

const { TabPane } = Tabs;

const ProfileScreen = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return (
    <div className="my-5 mx-1 py-5">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profil" key="1">
          <h2 className="text-center">
            <i className="fas fa-user-check"> Profil</i>
          </h2>
          <hr />
          <br />
          <Row className="justify-content-center">
            <Col md={10} sm={12} >
              <Card className="box py-2 text-center">
                <h4>
                  <b>First Name: </b> {user.firstName}
                </h4>
                <h4>
                  <b>Last Name: </b>
                  {user.lastName}
                </h4>
                <h4>
                  <b>Email: </b>
                  {user.email}
                </h4>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="My Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;
