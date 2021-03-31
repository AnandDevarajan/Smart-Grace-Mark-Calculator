import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';


const AdminProfile = () => {
  const [value, onChange] = useState(new Date());

  const [reload, setReload] = useState(true);
  const gracemarkCreate = useSelector((state) => state.gracemarkCreate);
  const { success, error } = gracemarkCreate;
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  // useEffect(() => {

  // }, []);

  return (
    <div className="ml-5">
      <Row>
        <Col md={8}><h3>Welcome to Admin Profile&nbsp;!!</h3></Col>  
      </Row> 
      <Row className="mt-5">
        <Col md={7} style={{backgroundColor : "#92a8d1" }}>
          
            <ListGroup variant='flush' className="mt-4 ml-2">
              <ListGroup.Item>
                <h4>Name:&nbsp;&nbsp;&nbsp;<i>{adminInfo.result.Name}</i></h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Email ID:&nbsp;&nbsp;&nbsp;<i>{adminInfo.result.EmailID}</i></h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Phone Number:&nbsp;&nbsp;&nbsp;<i>{adminInfo.result.PhoneNum}</i></h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Address:&nbsp;&nbsp;&nbsp;<i>{adminInfo.result.Address}</i></h4>
              </ListGroup.Item>
            </ListGroup>
          
        </Col>
        <Col style={{backgroundColor : "#92a8d1" }}><div className="mt-5 ml-5 mb-5"><Calendar onChange={onChange} value={value}/></div></Col>
        
      </Row>
    </div>
  );
};

export default AdminProfile;
