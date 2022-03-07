import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';
import { Row, Col, Table, Button} from 'react-bootstrap';
import Swal from 'sweetalert2'



const CarsTable = () => {
    const [loading, setLoading] = useState(true);
    const [Cars, setCars] = useState([]);
   
    const [error, setError] = useState(false);
  
   
      const car = async () => {
        try {
          const result = await (await axios.get('api/cars/getall')).data;
          setCars(result);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError(true);
          setLoading(false);
        }
      };
      useEffect(() => {
      car();

      

    },[]);

  
  
 const deleteCar= async(id)=>{
   try {
     setLoading(true)
      await (await axios.delete(`api/cars/deletecar/${id}`)).data
     setLoading(false)
     setCars()
     car()
     Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Car deleted !',
        showConfirmButton: false,
        timer: 3000
      })
  
     
   } catch (error) {
     console.log(error)
     setError(true);
     setLoading(false);
  
   }
 }


 
  return (
    <div className='box my-3 py-3'>
         <Row style={{ justifyContent: 'center',marginBottom:"20px"}} >
        <Col md={12} >
          <h4 className="text-center">Cars Table</h4>
          {loading && <Loader />}
          <div className='p-3 m-5'>
          <Table striped bordered hover variant="dark" className="text-center" responsive="sm">
            <thead>
              <tr>
                <th>Car ID</th>
                <th>Name</th>
                <th>Max Place</th>
                <th>Rent/Day</th>
                <th>Type</th>
                <th>Model</th>
                <th>Delete</th>
                
              </tr>
            </thead>

            {Cars ? Cars.map((car, _id) => {
                return (
                  <tbody key={Math.random()}>
                    <tr>
                      <td>{car._id}</td>
                      <td>{car.name}</td>
                      <td>{car.maxplace}</td>
                      <td>{car.rentperday}</td>
                      <td>{car.type}</td>
                      <td>{car.model}</td>
                      <td><Button className='btn btn-danger' onClick={()=>deleteCar(car._id)}>delete</Button></td>
                       </tr>
                  </tbody>
                );
              }): error}
          </Table>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default CarsTable