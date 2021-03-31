import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { studentRegister } from '../../actions/studentActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';

const StudentProfileEdit = ({ location, history, match }) => {
  const id = match.params.id;
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const studentSignup = useSelector((state) => state.studentSignup);
  const { error, studentInfo } = studentSignup;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/student/profile';

  useEffect(() => {
    if (studentInfo) {
      history.push(redirect);
    }
  }, [history, studentInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (phone === '' || address === '' || email === '' || password === '') {
      setMessage('');
      setMessage('Enter all the details');
    } else if (phone.length != 10) {
      setMessage('');
      setMessage('Invalid phone number');
    } else {
      setMessage('');
      dispatch(studentRegister(email, password, phone, address));
    }
  };

  return (
    <>
      {!show && (
        <>
          <Link to='/student/profile'>
            <Button variant='light'>
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <FormContainer>
            <h1>Edit Your Profile</h1>

            {message && <Message variant='warning'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
                  Email Address
                </Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='phone'>
                <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
                  Phone Number
                </Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter phone number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='address'>
                <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
                  Address
                </Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter  Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Link
                onClick={() => {
                  setShow(!show);
                }}
              >
                Change Password?{' '}
              </Link>
              <br />
              <Button type='submit' variant='primary' className='mt-3'>
                Save Changes
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
      {show && (
        <>
          <Link to='/student/profile'>
            <Button variant='light'>
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <h1>Change Password</h1>
              <Form.Group controlId='password'>
                <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
                  password
                </Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='confirmPassword'>
                <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>
                Save Changes
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default StudentProfileEdit;
