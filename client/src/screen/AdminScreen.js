import React, { useState, useEffect } from 'react';
import UsersTable from './admin-items/UsersTable';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const AdminScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const Admin = () => {
      if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
        navigate('/home');
      } else {
        navigate('/admin');
      }
    };
    Admin();
  }, []);

  return (
    <div className="box p-5 m-5 admin">
      <h4 className=" text-center py-2">
        <b>Admin Pannel</b>
      </h4>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Users" key="1">
          <UsersTable />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
