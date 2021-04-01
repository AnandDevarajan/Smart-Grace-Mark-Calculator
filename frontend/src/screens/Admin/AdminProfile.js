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
import axios from 'axios';
const AdminProfile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [value, onChange] = useState(new Date());

  const gracemarkCreate = useSelector((state) => state.gracemarkCreate);
  const { success, error } = gracemarkCreate;
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    axios
      .get(`/admin/${adminInfo.result.adminID}`)
      .then((response) => {
        setName(response.data.admin.Name);
        setEmail(response.data.admin.EmailID);

        setPhone(response.data.admin.PhoneNum);
        setAddress(response.data.admin.Address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminInfo, name, email, address, phone]);
  return (
    <div className='ml-5'>
      <Row>
        <Col md={8}>
          <h3>Welcome to Admin Profile&nbsp;!!</h3>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md={7} style={{ backgroundColor: '#92a8d1' }}>
          <ListGroup variant='flush' className='mt-4 ml-2'>
            <ListGroup.Item>
              <h4>
                Name:&nbsp;&nbsp;&nbsp;<i>{name}</i>
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                Email ID:&nbsp;&nbsp;&nbsp;<i>{email}</i>
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                Phone Number:&nbsp;&nbsp;&nbsp;
                <i>{phone}</i>
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                Address:&nbsp;&nbsp;&nbsp;<i>{address}</i>
              </h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col style={{ backgroundColor: '#92a8d1' }}>
          <div className='mt-5 ml-5 mb-5'>
            <Calendar onChange={onChange} value={value} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminProfile;
